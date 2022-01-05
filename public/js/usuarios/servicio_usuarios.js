'use strict';

function registrar_usuario(ptipoUsuario, pcedula, pnombre_completo,pcorreo, pfecha_nacimiento, pedad,pfoto_usuario, pcontrasenia){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            tipo_usuario : ptipoUsuario,
            cedula: pcedula,
            nombre_completo: pnombre_completo,
            fecha_nacimiento: pfecha_nacimiento,
            edad: pedad,
            correo: pcorreo,
            foto_usuario: pfoto_usuario,
            contrasenna: pcontrasenia,
        }
    });

    peticion.done(function(response){
        respuesta = response;
    });

    peticion.fail(function(response){
        respuesta = response;
    });


    return respuesta;
};

function listar_usuarios() {
    let listaUsuarios = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_usuarios',
        type: 'get', 
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        datatype: 'json', 
        async: false,
        data: {
        }
    });

    peticion.done(function(response){
        listaUsuarios = response;
         
    });

    peticion.fail(function(response){

    });

    return listaUsuarios;
};



function buscar_usuario(pid_usuario) {
    let usuario = [];
    $.ajax({
        url: 'http://localhost:4000/api/buscar_usuario',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        data: {
            id : pid_usuario
            
        },
        beforeSend: function beforeSend() {
            
        },
        success: function success(response) {
            usuario = response;
            
        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
        
    });
    return usuario;
};
