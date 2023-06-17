import jwt from 'jsonwebtoken';

class Autentificador {

  constructor() {
    this.secretKey = 'secreto';
  }
  generateTokenTiempo = (id, tiempoExpiracion) => {
    const token = jwt.sign({ userId: id }, this.secretKey, { expiresIn: tiempoExpiracion });
    return token;
  };

  autentificarToken = (req, res, next) => {
    try {
      
      const decoded = jwt.verify(req, 'secreto');

     
      console.log("Token valido " + decoded.exp); 

    } catch (error) {
      
      console.error('Error al verificar el token:', error.message);
      throw new Error('Error token expirado');
    }

  };


  decodificarToken(token){
    const decodedToken = jwt.verify(token, this.secretKey);
    return decodedToken
  }

}

export default Autentificador