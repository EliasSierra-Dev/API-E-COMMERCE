
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {

    const token = req.headers.authorization?.split(" ")[1]; // 1. Obtenemos el token desde el header

    if(!token){  // 2. Verificamos que existe el toke
        return res.status(400).json({msg: 'No hay token'})
    }
    try { // 3. Verificamos que el token coincida con la firma
        const decode = jwt.verify( token, process.env.JWT_SECRET);
        req.user = decode //  req.user guardamos los datos del usuario autenticado para usarlos en las rutas protegidas:
        next();
        
    } catch (error) {
        res.status(401).json({ msg: "Token inválido o expirado" });
        
    }
}

module.exports = authMiddleware;