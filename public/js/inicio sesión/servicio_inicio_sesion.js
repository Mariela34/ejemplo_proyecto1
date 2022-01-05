'use strict';
function validarCredenciales(pcorreo_inicio, pcontrasenna_inicio){
    let respuesta = false;
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/validar_credenciales',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            correo : pcorreo_inicio,
            contrasenna :  pcontrasenna_inicio, 
        }
    });

    peticion.done(function(response){
        respuesta =  response;

        
        sessionStorage.setItem('conectado' , response.success);
        sessionStorage.setItem('tipo_usuario' , response.tipo_usuario);
        sessionStorage.setItem('nombre_completo', response.nombre_completo);
        sessionStorage.setItem('cedula', response.identificacion);
        sessionStorage.setItem('foto_usuario', response.foto_usuario);
        sessionStorage.setItem('edad', response.edad);
        sessionStorage.setItem('usuario', response._id);
        sessionStorage.setItem('correo', response.correo);
        
      });
    
      peticion.fail(function(){
        
      });

      return respuesta;

      
};