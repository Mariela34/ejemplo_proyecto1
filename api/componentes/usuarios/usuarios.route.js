const express = require('express');
const router = express.Router();
const usuarioApi = require('./usuarios.api');



router.route('/registrar_usuario')
    .post(function(req, res) {
        usuarioApi.registrarUsuario(req, res);
    });

router.route('/buscar_usuario')
    .post(function(req, res) {
        usuarioApi.buscarUsuario(req, res);
    })

//route donde se enlazará la función de la api para el inicio de sesión
router.route('/validar_credenciales')
    .post(function(req, res){
        usuarioApi.accederCuenta(req, res);
    });

router.route('/listar_usuarios')
    .get(function(req, res){
        usuarioApi.listaUsuarios(req, res);
    });


module.exports = router;

