'use strict';
const opcion_usuario = document.querySelector('#nav_usuarios');
const opcion_hoteles = document.querySelector('#nav_hoteles');

let conectado = sessionStorage.getItem('conectado');
let usuario = sessionStorage.getItem('tipo_usuario');


if(conectado){
   
                     
}else{
    window.location.href = 'inicio_sesion.html';
};