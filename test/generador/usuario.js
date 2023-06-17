import { faker } from '@faker-js/faker';

const get = _ => ({

    email: faker.internet.email(),
    celular:faker.phone.number(),
    nombre:faker.person.firstName(),
    pass:faker.string.alpha(),
    apellido: faker.person.lastName(),
    fechaNacimiento:faker.date.between({ from: '1980-01-01T00:00:00.000Z', to: '2000-01-01T00:00:00.000Z' }).toISOString().split('T')[0],
    dni:faker.number.int({ min: 10000000, max: 40000000 }).toString()
    
 })


export default {
    get
}