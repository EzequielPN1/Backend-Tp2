import { expect } from 'chai'
import generador from './generador/usuario.js'

describe('Test del generador de usuario aleatorio', () => {
    
    it('Deberia traer un usuario con campos email,celular,nombre,pass,apellido,fechaNacimiento,dni', () => {
        const usuario =  generador.get()
        console.log(usuario)

        expect(usuario).to.include.keys('email','celular','nombre','pass','apellido','fechaNacimiento','dni')
    })

    it('Deberia traer un usuario aleatorio', () => {
        const usuario1 =  generador.get()
        const usuario2 =  generador.get()
        console.log(usuario1)
        console.log(usuario2)

        expect(usuario1.email).not.to.eql(usuario2.email)
        expect(usuario1.celular).not.to.eql(usuario2.celular)
        expect(usuario1.nombre).not.to.eql(usuario2.nombre)
        expect(usuario1.pass).not.to.eql(usuario2.pass)
        expect(usuario1.apellido).not.to.eql(usuario2.apellido)
        expect(usuario1.fechaNacimiento).not.to.eql(usuario2.fechaNacimiento)
        expect(usuario1.dni).not.to.eql(usuario2.dni)
    })
})