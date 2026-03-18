
// solo arranca el servidor
require('dotenv').config();
const connectBD = require('./src/config/db');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

connectBD(); // ← ejecuta la conexión


app.listen( PORT, ()=> { // app.listen() recibe dos parámetros: PORT puerto donde escucha el servidor, callbackFunción que se ejecuta cuando el servidor ya está listo
    console.log( `Servidor corriendo en el puerto ${PORT}` );

});