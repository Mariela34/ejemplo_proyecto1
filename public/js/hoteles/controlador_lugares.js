'use strict';
const selectProvincia = document.querySelector('#seleccionProvincia');
const selectCanton = document.querySelector('#seleccionCanton');
const selectDistrito = document.querySelector('#seleccionDistrito');

let provincias = obtener_provincias();
let cantones = obtener_cantones();
let distritos = obtener_distritos();

function llenarProvincias() {
    for (let i = 0; i < provincias.length; i++) {
        let opcion = new Option(provincias[i].nombre);
        opcion.value = provincias[i].idProvincia;
        selectProvincia.appendChild(opcion);
    }
};

function llenarCantones(pidProvincia) {
    selectCanton.innerHTML = '';
    selectCanton.appendChild(new Option('--Seleccione un cantón--'));

    for (let i = 0; i < cantones.length; i++) {
        if (pidProvincia == cantones[i].Provincia_idProvincia) {
            let opcion = new Option(cantones[i].nombre);
            opcion.value = cantones[i].idCanton;
            selectCanton.appendChild(opcion);
        }
    }
};

function llenarDistritos(pidCanton) {
    selectDistrito.innerHTML = '';
    selectDistrito.appendChild(new Option('--Seleccione un distrito--'));

    for (let i = 0; i < distritos.length; i++) {
        if (pidCanton == distritos[i].Canton_idCanton){
            let opcion = new Option(distritos[i].nombre);
            opcion.value = distritos[i].idDistrito;
            selectDistrito.appendChild(opcion);
        }    
    }

};


llenarProvincias();

selectProvincia.addEventListener('change', function(){
    llenarCantones(this.value); //this.value es el valor de la opción de provincia seleccionada
});

selectCanton.addEventListener('change', function(){
    llenarDistritos(this.value); //this.value es el valor de la opción de cantones seleccionada
});

    