'use strict';
const botonRegistrar = document.querySelector('#btn_Registrar');
const inputNombreHotel = document.querySelector('#textNombreHotel');
const inputLongitud = document.querySelector('#posicionX');
const inputLatitud = document.querySelector('#posicionY');
const seleccionProvincia = document.querySelector('#seleccionProvincia');
const seleccionCanton = document.querySelector('#seleccionCanton');
const seleccionDistrito = document.querySelector('#seleccionDistrito');
const inputDireccion = document.querySelector('#textDireccion');


botonRegistrar.addEventListener('click', obtenerDatosHotel);


function obtenerDatosHotel(){
    let nombre_hotel = inputNombreHotel.value;
    let provincia = seleccionProvincia.value;
    let canton = seleccionCanton.value;
    let distrito = seleccionDistrito.value;
    let longitud = inputLongitud.value;
    let latitud = inputLatitud.value;
    let direccion = inputDireccion.value;

    for (let i = 0; i < provincias.length; i++) {
        if (provincia == provincias[i].idProvincia) {
            provincia = provincias[i].nombre;
        }
    }

    for (let i = 0; i < cantones.length; i++) {
        if (canton == cantones[i].idCanton) {
            canton = cantones[i].nombre;
        }
    }

    for (let i = 0; i < distritos.length; i++) {
        if (distrito == distritos[i].idDistrito) {
            distrito = distritos[i].nombre;
        }
    }




    let inputError = validar(nombre_hotel, longitud, latitud, provincia, canton, distrito, direccion);

        if(inputError==false){
            

            let respuesta = registrar_hotel(nombre_hotel,  longitud, latitud, provincia, canton, distrito, direccion);

            if(respuesta.success==true) {
                swal({
                    type: 'success',
                    title: 'Registro exitoso',
                    text: 'Se han ingresado los datos del nuevo hotel correctamente.',
                    timer: 3000
                }).then( function() {
                    window.location.href = 'listar_hoteles.html';
                });
            } else {
                swal({
                    type: 'warning',
                    title: 'Registro incorrecto',
                    text: 'No se pudo realizar el registro de este hotel.'
                });
            }
        }else{
            swal({
                type: 'warning',
                title: 'Se detectó un error',
                text: 'Revise nuevamente los datos ingresados'
            });
        }
    };

    function validar(pnombre_hotel, plongitud, platitud, pprovincia, pcanton, pdistrito, pdireccion){
        let error = false;
        let expNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$/;
        

        if( pnombre_hotel == '' || pnombre_hotel.length == 0 || expNombre.test(pnombre_hotel)==false){
            inputNombreHotel.classList.add('errorInput');
            error = true;
        }else{
            inputNombreHotel.classList.remove('errorInput');
        }

        if(plongitud== ''|| plongitud.length==0){
            //mapa.style.border='1px solid red';
            document.querySelector('#map').style.border = '3px solid red' ;
            error= true;
        }else{
            //mapa.style.border='1px solid black';
            document.querySelector('#map').style.border = 'none';
        }  
        /*latitud*/
        if(platitud== ''|| platitud.length==0){
            //mapa.style.border='1px solid red';
            document.querySelector('#map').style.border = '3px solid red' ;
            error= true;
        }else{
            //mapa.style.border='1px solid black';
            document.querySelector('#map').style.border = 'none';
        }  


        if(pprovincia == 'Seleccione una provincia' || pprovincia.length == 0 ){
            seleccionProvincia.classList.add('errorInput');
            error = true;
        }else{
            seleccionProvincia.classList.remove('errorInput');
        }

        if(pcanton == 'Seleccione un cantón' || pcanton.length == 0 ){
            seleccionCanton.classList.add('errorInput');
            error = true;
        }else{
            seleccionCanton.classList.remove('errorInput');
        }

        if(pdistrito == 'Seleccione un distrito' || pdistrito.length == 0 ){
            seleccionDistrito.classList.add('errorInput');
            error = true;
        }else{
            seleccionDistrito.classList.remove('errorInput');
        }


        if(pdireccion == '' || pdireccion.length == 0){
            inputDireccion.classList.add('errorInput');
            error = true;
        }else{
            inputDireccion.classList.remove('errorInput');
        }

        return error;
    };

 