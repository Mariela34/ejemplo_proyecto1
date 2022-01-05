'use strict';
const opcion_usuario = document.querySelector('#nav_usuarios');
const opcion_hoteles = document.querySelector('#nav_hoteles');

let conectado = sessionStorage.getItem('conectado');
let usuario = sessionStorage.getItem('tipo_usuario');


if(conectado){
    if(usuario == "Administrador"){
        opcion_hoteles.href = 'listar_hoteles.html';
    }

    if(usuario == "Cliente"){
        opcion_usuario.style.display = 'none';
        opcion_hoteles.href = 'listar_hoteles_cliente.html';
    }
                     
}else{
    window.location.href = 'inicio_sesion.html';
};
