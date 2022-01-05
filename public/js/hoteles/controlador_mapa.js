'use strict';

let tituloSucursal = document.querySelector('.titulo');
let nombre = sessionStorage.getItem('nombre_hotel');
let boton_cerrar_mapa = document.querySelector('#equis_cerrar');

let id_usuario = sessionStorage.getItem('usuario');

boton_cerrar_mapa.addEventListener('click', validarUsuario);

function validarUsuario() {
    let usuario = buscar_usuario(id_usuario);
    if(usuario['tipo_usuario']=='Administrador') {
        window.location.href = 'listar_hoteles.html';
    } 

    if(usuario['tipo_usuario'] == 'Cliente') {
        window.location.href = 'listar_hoteles_cliente.html';
    }
}


let titulo_mapa = document.createElement('div');
let texto = 'Mapa de ' + nombre;

let contenedor_texto = document.createElement('h1');

let texto_mapa = document.createTextNode(texto);



tituloSucursal.appendChild(titulo_mapa);

titulo_mapa.appendChild(contenedor_texto);
contenedor_texto.appendChild(texto_mapa);
