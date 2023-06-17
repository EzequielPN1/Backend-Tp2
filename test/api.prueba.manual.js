import axios from 'axios';

const pruebaDeServidorConAxios = async () => {
  const urlPost = 'http://localhost:3001/login';
  const dataPost = {
    email: 'ezequiel@hotmail.com',
    pass: '123'
  };

  try {
    const respuesta = await axios.post(urlPost, dataPost);
    const { status, data: body } = respuesta;

    console.log('status code', status);
    console.log('body', body);
  } catch (error) {
    console.log('Error', error.message);
  }

  const email = "ezequiel@hotmail.com";
  const urlGet = `http://localhost:3001/gastos/listar/${email}`;
  
  try {
    const respuesta = await axios.get(urlGet);
    const { status, data: body } = respuesta;
  
    console.log('status code', status);
    console.log('body', body);
  } catch (error) {
    console.log('Error', error.message);
  }
  

};

pruebaDeServidorConAxios()