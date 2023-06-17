import nodemailer from 'nodemailer';


class Mailer{

  constructor() {
    // Configurar el transporte de nodemailer con tus credenciales de correo electrónico
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ventaDeTicketsPN1@gmail.com',
        pass: 'sjklkmqbxdnrclqy',
      },
    }); 
  }


  

// Enviar el correo electrónico de confirmación
async  enviarCorreoConfirmacion(token, email) {
  const mensaje = {
    from: 'ventaDeTicketsPN1@gmail.com',
    to: 'ventaDeTicketsPN1@gmail.com',
    subject: 'Confirmación de registro',
    html: `
      <p>"Token generado de confirmación: ${token}, email: ${email}"</p>
      <p>¡Gracias por registrarte!</p>
      <p>Para confirmar tu correo electrónico, haz clic en el siguiente enlace:</p>
      <a href="https://server-controlgastos.glitch.me/confirmar?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}">Confirmar registro</a>
    `,
  };

  try {
    const info = await this.transporter.sendMail(mensaje);
    console.log('Correo electrónico enviado:', info.response);
  } catch (error) {
    console.log('Error al enviar el correo electrónico:', error);
  }
}


async  enviarCorreoCambioPass(email,token) {
  const mensaje = {
    from: 'ventaDeTicketsPN1@gmail.com',
    to: 'ventaDeTicketsPN1@gmail.com',
    subject: 'Cambio de Pass',
    html: `
    <p>"Token generado de cambio de pass: ${token}, email: ${email}"</p>
      <p>Para cambiar tu contraseña, haz clic en el siguiente enlace:</p>
      <a href="http://localhost:5173/cambioDePass?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}">Cambiar contraseña</a>
    `,
  };

  try {
    const info = await this.transporter.sendMail(mensaje);
    console.log('Correo electrónico enviado:', info.response);
  } catch (error) {
    console.log('Error al enviar el correo electrónico:', error);
  }
}
}

export default Mailer