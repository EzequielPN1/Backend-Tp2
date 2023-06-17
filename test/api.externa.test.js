import { expect } from 'chai'
import generador from './generador/usuario.js'
import supertest from 'supertest'

const request = supertest('http://localhost:3001')

describe('Test api rest ful', () => {

    describe('GET', () => {

        it('Deberia retornar un status 200 con los gastos del usuario', async () => {
            const email = "ezequiel@hotmail.com";
            const response = await request.get(`/gastos/listar/${email}`)
            expect(response.status).to.eql(200)
           // console.log(response.body);
           response.body.forEach((gasto) => {
            expect(gasto.email).to.eql(email);
          });
        })
        
    })

    describe('POST', () => {

        it('Deberia retornar un status 200 con el mensaje usuario registrado correctamente', async () => {
            const usuario = generador.get()
            console.log(usuario)
            const response = await request.post('/register').send(usuario)
         // console.log(response.text);
            expect(response.status).to.eql(200),
            expect(response.text).to.eql('Usuario registrado correctamente')          
        })

    })



})