import { expect } from 'chai'
import generador from './generador/usuario.js'
import supertest from 'supertest'
import Server from '../server.js'
import config from '../config.js'



describe('Test api rest ful', () => {

    describe('GET', () => {
        
        it('Deberia retornar un status 200 con los gastos del usuario', async () => {
            const server = new Server(8081,config.MODO_PERSISTENCIA)
            const app = await server.start()
            const request = supertest(app)

            const email = "ezequiel@hotmail.com";
            const response = await request.get(`/gastos/listar/${email}`)
            expect(response.status).to.eql(200)
           // console.log(response.body);
           response.body.forEach((gasto) => {
            expect(gasto.email).to.eql(email);
          });

          await server.stop()
        })
    })

    
    describe('POST', () => {

        it('Deberia retornar un status 200 con el mensaje usuario registrado correctamente', async () => {
            const server = new Server(8081,config.MODO_PERSISTENCIA)
            const app = await server.start()
            const request = supertest(app)
          
          
            const usuario = generador.get()
            console.log(usuario)
            const response = await request.post('/register').send(usuario)
         // console.log(response.text);
            expect(response.status).to.eql(200),
            expect(response.text).to.eql('Usuario registrado correctamente')
            
            await server.stop()
        })
    })
    



})