'use strict';
const botonActualizar = document.querySelector('#btn_Actualizar');
const modificarNombreHotel = document.querySelector('#modificarNombreHotel');
const modifiqueLongitud = document.querySelector('#posicionX_mod');
const modifiqueLatitud = document.querySelector('#posicionY_mod');
const modifiqueProvincia = document.querySelector('#seleccionProvincia');
const opcionesProvincia = document.querySelectorAll('#seleccionProvincia option');
const modifiqueCanton = document.querySelector('#seleccionCanton');
const opcionesCanton = document.querySelectorAll('#seleccionCanton option');
const modifiqueDistrito = document.querySelector('#seleccionDistrito');
const opcionesDistrito = document.querySelectorAll('#seleccionDistrito option');
const modificarDireccion = document.querySelector('#modificarDireccion');

let opProvincia = modifiqueProvincia.options;
let opCantones = modifiqueCanton.options;
let opDistrito= modifiqueDistrito.options;

let id_hotel = localStorage.getItem('hotel');

botonActualizar.addEventListener('click', obtenerHotelEditar);

//Pasar los valores de String a numéricos
    let hotel = buscar_hotel(id_hotel);

    let provincia_hotel  = hotel['provincia'];
    let canton_hotel = hotel['canton'];
    let distrito_hotel = hotel['distrito'];

    for (let i = 0; i < provincias.length; i++) {
        if (provincia_hotel == provincias[i].nombre) {
            provincia_hotel = provincias[i].idProvincia;
        }
    }

    for (let i = 0; i < cantones.length; i++) {
        if (canton_hotel == cantones[i].nombre) {
            canton_hotel = cantones[i].idCanton;
        }
    }

    for (let i = 0; i < distritos.length; i++) {
        if (distrito_hotel == distritos[i].nombre) {
            distrito_hotel = distritos[i].idDistrito;
        }
    }



if(id_hotel){
    mostrarDatosHotel();
}else{
    alert('Debe seleccionar un hotel para modificar');
    window.location.href='listar_hoteles.html';
}



function mostrarDatosHotel() {
     hotel = buscar_hotel(id_hotel);


    modificarNombreHotel.value = hotel['nombre_hotel'];

    modifiqueLongitud.value = Number(hotel['longitud_mapa']);
    modifiqueLatitud.value = Number(hotel['latitud_mapa']);

    for(let i = 0; i < opProvincia.length; i++){
        if( provincia_hotel == opProvincia[i].value){
            modifiqueProvincia.selectedIndex = i;
            llenarCantones(provincia_hotel);
        }
    }

    for(let i = 0; i < opCantones.length; i++){
        if( canton_hotel == opCantones[i].value){
            modifiqueCanton.selectedIndex = i;
            llenarDistritos(canton_hotel);
            
        }
    }

    for(let i = 0; i < opDistrito.length; i++){
        if( distrito_hotel == opDistrito[i].value){
            modifiqueDistrito.selectedIndex = i;
        }
    }


    modificarDireccion.value = hotel['direccion'];
};




 
    function obtenerHotelEditar(){
    let nombre_hotel = modificarNombreHotel.value;
    let longitud = modifiqueLongitud.value;
    let latitud = modifiqueLatitud.value;
    let provincia = modifiqueProvincia.value;
    let canton = modifiqueCanton.value;
    let distrito = modifiqueDistrito.value;
    let direccion = modificarDireccion.value;
   

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
           
            let respuesta = modificar_hotel(id_hotel, nombre_hotel, longitud, latitud, provincia, canton, distrito, direccion);

            if(respuesta.success == true) {
                swal({
                    type: 'success', 
                    title: 'Hotel modificado',
                    text: 'El hotel se ha modificado con éxito',
                    timer: 3000
                }).then( function() {
                    window.location.href = "listar_hoteles.html";
                });
            } else {
                swal({
                    type: 'error',
                title: 'Modificación incorrecta',
                text: 'No se pudo realizar correctamente la modificación del hotel'
                })
            }

        }else{
            swal({
                type: 'warning',
                title: 'Se encontró un error',
                text: 'Se detectó un espacio requerido vacío o hubo un dato ingresado con un formato incorrecto'
            });
        }
    };

    function validar(pnombre_hotel, plongitud, platitud ,pprovincia, pcanton, pdistrito, pdireccion){
        let error = false;
        let expNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$/;
        

        if( pnombre_hotel == '' || pnombre_hotel.length == 0 || expNombre.test(pnombre_hotel)==false){
            modificarNombreHotel.classList.add('errorInput');
            error = true;
        }else{
            modificarNombreHotel.classList.remove('errorInput');
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
        if(platitud == ''|| platitud.length==0){
            //mapa.style.border='1px solid red';
            document.querySelector('#map').style.border = '3px solid red' ;
            error= true;
        }else{
            //mapa.style.border='1px solid black';
            document.querySelector('#map').style.border = 'none';
        }  


        if(pprovincia == 'Seleccione una provincia' || pprovincia.length == 0 ){
            modifiqueProvincia.classList.add('errorInput');
            error = true;
        }else{
            modifiqueProvincia.classList.remove('errorInput');
        }

        if(pcanton == 'Seleccione un cantón' || pcanton.length == 0 ){
            modifiqueCanton.classList.add('errorInput');
            error = true;
        }else{
            modifiqueCanton.classList.remove('errorInput');
        }

        if(pdistrito == 'Seleccione un distrito' || pdistrito.length == 0 ){
            modifiqueDistrito.classList.add('errorInput');
            error = true;
        }else{
            modifiqueDistrito.classList.remove('errorInput');
        }


        if(pdireccion == '' || pdireccion.length == 0){
            modificarDireccion.classList.add('errorInput');
            error = true;
        }else{
            modificarDireccion.classList.remove('errorInput');
        }

        return error;
    };


/*Mapa */
let marker;          
let coords = {};    


//Funcion principal
function initMap() 
{
    
    let x = Number(modifiqueLongitud.value);
    let y = Number(modifiqueLatitud.value);
    let ubicacionInicial = {lat: y, lng: x};

    

  navigator.geolocation.getCurrentPosition(
          function (position){
            coords =  {
              lng: position.coords.longitude,
              lat: position.coords.latitude,
            };
            setMapa(coords); 
            
           
          },function(error){console.log(error);});
    



function setMapa (coords)
{   
      //Se crea una nueva instancia del objeto mapa
      let map = new google.maps.Map(document.getElementById('map'),
      {
        zoom: 17,
        center: {lat:  Number(modifiqueLatitud.value), lng: Number(modifiqueLongitud.value)},

      });

      //Creamos el marcador en el mapa con sus propiedades
      //para nuestro obetivo tenemos que poner el atributo draggable en true
      //position pondremos las mismas coordenas que obtuvimos en la geolocalización
      marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: ubicacionInicial,

      });
      //agregamos un evento al marcador junto con la funcion callback al igual que el evento dragend que indica 
      //cuando el usuario a soltado el marcador
      marker.addListener('click', toggleBounce);
      
      marker.addListener( 'dragend', function (event)
      {
        //escribimos las coordenadas de la posicion actual del marcador dentro del input #coords
         let latitude= document.getElementById("posicionY_mod").value = this.getPosition().lat();
         let longitude=document.getElementById("posicionX_mod").value = this.getPosition().lng();
        return coords;
      });
}

//callback al hacer clic en el marcador lo que hace es quitar y poner la animacion BOUNCE
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}}
