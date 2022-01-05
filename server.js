
// Se exporta http dentro de la arquitectura
const http = require('http');

const port = 3000; //Se establece el puerto 3000 como punto de origen para acceder a la aplicación, para acceder se usa localhost:3000 en el navegador

const serveStatic = require('serve-static'); //Es la dependencia que permite crear un servido
// Se exporta la conexión de nodejs
const connect = require('connect');

const nodemon = require('nodemon');


connect().use(serveStatic(__dirname)).listen(port, () => {
  console.log('El servidor esta levantado en el puerto ' + port);
  nodemon({
    script: 'api/index.js',
    ext: 'js'
  });
});