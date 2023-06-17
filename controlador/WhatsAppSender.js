import qrcode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';
import ServicioGasto from '../servicio/gastos.js'
import ServicioCategoria from '../servicio/categorias.js'

class WhatsAppSender {
  constructor() {

    this.client = new Client();
    this.gastos = new ServicioGasto()
    this.categorias = new ServicioCategoria()

    this.client.on('ready', () => {
      console.log('Cuenta de Ezequiel logueada');
      this.enviarMensaje('5491133419818@c.us', 'Cuenta de Ezequiel logueada');
    });

    this.iniciarSesion();
    this.escuchandoBoot();
  }

  iniciarSesion() {
    this.client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.client.initialize();

  }


  enviarMensaje(numero, mensaje) {
    try {
      this.client.sendMessage(numero, mensaje);
      console.log("Mensaje enviado con éxito al número " + numero);
    } catch (error) {
      console.log("Error al enviar el mensaje");
    }
  }


  convertirEnNumeroWhatsApp(numero) {
    let numeroAdaptado = "549" + numero + "@c.us";
    return numeroAdaptado;
  }

  convertirEnNumeroOriginal(numeroAdaptado) {
    // Eliminar el prefijo "549" y el sufijo "@c.us"
    let numeroOriginal = numeroAdaptado.replace("549", "").replace("@c.us", "");
    return numeroOriginal;
  }


  enviarBootPresentacion(whatsapp) {
    const robotEmoji = '\u{1F916}';
    const mensajeBienvenida = 'Bienvenido al Boot de Control de gastos' + robotEmoji;
    const mensajeMenu = 'Puedo ayudarte con estas acciones si deseas'
    const mensajeInfo = `1-Contarte sobre la aplicacion`;
    const mensajeIngresarGasto = `2-Ingresar un Gasto`;
    const mensajeIngresarCategoria = `3-Ingresar una Categoria`



    this.enviarMensaje(whatsapp, mensajeBienvenida)
    this.enviarMensaje(whatsapp, mensajeMenu)
    this.enviarMensaje(whatsapp, mensajeInfo)
    this.enviarMensaje(whatsapp, mensajeIngresarGasto)
    this.enviarMensaje(whatsapp, mensajeIngresarCategoria)


  }


  escuchandoBoot() {
    this.client.on('message', message => {

      if (message.body === '1') {
        const mensajeInfoAplicacion = `ControldeGastos\n
        La finalidad del uso de una aplicación web de control de gastos es ayudarte a administrar y supervisar tus finanzas personales de manera más efectiva.\n
        Las funcionalidades principales son:\n
        1-Seguimiento de gastos: Puedes ingresar manualmente tus gastos.\n   
        2-Presupuesto: Puedes establecer metas de gastos mensuales o semanales y la aplicación te ayudará a realizar un seguimiento de tus gastos en relación con tu presupuesto establecido.\n       
        3-Análisis y visualización: mostrar gráficos y tablas que te permiten visualizar tus datos financieros.\n     
        4-Recordatorios y alertas: Puedes establecer metas de ahorro.\n       
        5-Acceso desde cualquier lugar: Al ser una aplicación web, puedes acceder a ella desde cualquier dispositivo con conexión a Internet.`;
        this.client.sendMessage(message.from, mensajeInfoAplicacion);
      }

      if (message.body === '2') {
        this.client.sendMessage(message.from, `ingrese  la plantilla con los datos correspondientes para su ingreso:`);
        this.client.sendMessage(message.from, `
         IngresoGasto:
        
        email: 
        titulo:  
        monto: 
        idCategoria: 
        descripcion: 
        `);

      }

      const ingresoGasto = ['IngresoGasto:'];

      if (message.body.includes(ingresoGasto)) {
        const palabrasClaves = ['email:', 'titulo:', 'monto:', 'idCategoria:', 'descripcion:'];
        const encontradas = [];
        const gasto = { email: '', titulo: '', monto: '', fecha: '', idCategoria: '', descripcion: '' };

        palabrasClaves.forEach((palabra) => {
          if (message.body.includes(palabra)) {
            encontradas.push(palabra);
            const regex = new RegExp(palabra + '([^\\n]+)');
            const match = message.body.match(regex);
            if (match && match[1]) {
              const value = match[1].trim();
              gasto[palabra.replace(':', '')] = value;
            }
          }
        });

        this.guardarGasto(message.from, gasto)
      }


      if (message.body === '3') {
        this.client.sendMessage(message.from, `ingrese  la plantilla con los datos correspondientes para su ingreso: `);
        this.client.sendMessage(message.from, `
        IngresoCategoria:

        nombre: 
        email: 
        presupuesto: 
        `);

      }

      const ingresoCategoria = ['IngresoCategoria:'];

      if (message.body.includes(ingresoCategoria)) {
        const palabrasClaves = ['nombre:', 'email:', 'presupuesto:'];
        const encontradas = [];
        const categoria = { nombre: '', email: '', presupuesto: '' };

        palabrasClaves.forEach((palabra) => {
          if (message.body.includes(palabra)) {
            encontradas.push(palabra);
            const regex = new RegExp(palabra + '([^\\n]+)');
            const match = message.body.match(regex);
            if (match && match[1]) {
              const value = match[1].trim();
              categoria[palabra.replace(':', '')] = value;
            }
          }
        });

        this.guardarCategoria(message.from, categoria)
      }

    })
  }




  async guardarGasto(numero, gasto) {
    try {
      let idCategoria = await this.categorias.devolverId(gasto.idCategoria, gasto.email);

      const fechaActual = new Date();
      const año = fechaActual.getFullYear();
      let mes = fechaActual.getMonth() + 1;
      if (mes < 10) {
        mes = '0' + mes;
      }
      let dia = fechaActual.getDate();
      if (dia < 10) {
        dia = '0' + dia;
      }

      const fechaFormateada = `${año}-${mes}-${dia}`;


      gasto.idCategoria = idCategoria
      gasto.fecha = fechaFormateada;
      console.log(gasto);


      await this.gastos.agregar(gasto);
      this.client.sendMessage(numero, 'Ingreso correcto del gasto ');
      console.log("Gasto agregado correctamente por whatsApp");
    } catch (error) {
      console.error('Ocurrió un error en al guardar el gasto');
      this.client.sendMessage(numero, 'Error vuelva a ingresar la plantilla completa');

    }
  }

  async guardarCategoria(numero, categoria) {

    try {
      await this.categorias.agregar(categoria)
      this.client.sendMessage(numero, 'Ingreso correcto de la categoria ');

    } catch (error) {
      console.error('error' + error);
      this.client.sendMessage(numero, 'Error vuelva a ingresar la plantilla completa ');

    }
  }









}


export default WhatsAppSender;