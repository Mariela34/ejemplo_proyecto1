'use strict';


let ubicacion = document.querySelector('#espacio_de_ubicacion');
const nombre_hotel = document.querySelector('.nombre_hotel');
const direccion_hotel = document.querySelector('.direccion_hotel');
const boton_calificar = document.querySelector('#boton_evaluar');
const ver_ubicacion = document.querySelector('#ver_ubicacion');

boton_calificar.addEventListener('click', calificar);
let id_usuario = sessionStorage.getItem('usuario');

let id_hotel = localStorage.getItem('hotel');

let hotel = buscar_hotel(id_hotel);

let distrito = hotel['distrito'];
let canton = hotel['canton'];
let provincia = hotel['provincia'];


let latitud  = hotel['latitud_mapa'];
let longitud = hotel['longitud_mapa'];




ver_ubicacion.addEventListener('click', ver_mapa);

ubicacion.textContent = distrito+", "+canton+", "+provincia;
nombre_hotel.textContent = hotel['nombre_hotel'];

direccion_hotel.textContent = hotel['direccion'];


function ver_mapa(){
    sessionStorage.setItem('nombre_hotel', nombre_hotel.textContent);
    sessionStorage.setItem('latitudTemp', Number(latitud));
    sessionStorage.setItem('longitudTemp', Number(longitud));
    sessionStorage.setItem('usuario', id_usuario);
    
    document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
}

function calificar() {
        hotel = buscar_hotel(id_hotel);
        let calificacion_comida_nueva ='';
        let calificacion_calidad_servicio_nueva ='';
        let calificacion_infraestuctura_nueva ='';
        let calificacion_habitaciones_nueva = '';
        let calificacion_limpieza_nueva = '';
        let calificaciones_sumadas = hotel['calificaciones_sumadas'];
        let calificaciones_totales = hotel['total_de_calificiones'];
      
        let nueva_calificacion  = 0;
    
        let errorEstrellas = validarEstrellas();
    
        if(errorEstrellas==false) {
            calificacion_comida_nueva = Number(document.querySelector('#calificacion_comida input[type=radio]:checked').value);
            calificacion_calidad_servicio_nueva = Number(document.querySelector('#calificacion_calidad_servicio input[type=radio]:checked').value);
            calificacion_infraestuctura_nueva = Number(document.querySelector('#calificacion_infraestructura input[type=radio]:checked').value);
            calificacion_habitaciones_nueva = Number(document.querySelector('#calificacion_habitaciones input[type=radio]:checked').value);
            calificacion_limpieza_nueva = Number(document.querySelector('#calificacion_limpieza input[type=radio]:checked').value);
    
    
            calificaciones_sumadas = calificaciones_sumadas + calificacion_comida_nueva + calificacion_calidad_servicio_nueva + calificacion_infraestuctura_nueva + calificacion_habitaciones_nueva + calificacion_limpieza_nueva;
    
            nueva_calificacion = calificaciones_totales + 1;
    
           let promedio = calificaciones_sumadas / calificaciones_totales;

    
            calificar_hotel(id_hotel, calificacion_comida_nueva, calificacion_calidad_servicio_nueva, calificacion_infraestuctura_nueva, calificacion_habitaciones_nueva, calificacion_limpieza_nueva, calificaciones_sumadas, nueva_calificacion, promedio);
            swal({
                type: 'success', 
                title: '¡Calificación hecha!',
                text: 'Se realizó con éxito su calificación a este hotel. !Muchas gracias!',
                timer: 3000
            }).then( function () {
                window.location.href='listar_hoteles_cliente.html'
            });
        } else {
            swal({
                type: 'warning', 
                title: '¡Error!',
                text: 'Por favor, califique las 5 opciones para poder realizar la calificación',
                timer: 3000
            });
        }
      
};



function validarEstrellas(){
    let error = false;
    if(document.querySelector('#calificacion_comida input[type=radio]:checked')== null){
        document.querySelector('#calificacion_comida').classList.add('errorInput');
        error = true;
      }else{
        document.querySelector('#calificacion_comida').classList.remove('errorInput');
      }

      if(document.querySelector('#calificacion_calidad_servicio input[type=radio]:checked') == null){
        document.querySelector('#calificacion_calidad_servicio').classList.add('errorInput');
        error = true;
      }else{
        document.querySelector('#calificacion_calidad_servicio').classList.remove('errorInput');
      }

      if(document.querySelector('#calificacion_infraestructura input[type=radio]:checked') == null){
        document.querySelector('#calificacion_infraestructura').classList.add('errorInput');
        error = true;
      }else{
        document.querySelector('#calificacion_infraestructura').classList.remove('errorInput');
      }

      if(document.querySelector('#calificacion_habitaciones input[type=radio]:checked') == null){
        document.querySelector('#calificacion_habitaciones').classList.add('errorInput');
        error = true;
      }else{
        document.querySelector('#calificacion_habitaciones').classList.remove('errorInput');
      }

      if(document.querySelector('#calificacion_limpieza input[type=radio]:checked') == null){
        document.querySelector('#calificacion_limpieza').classList.add('errorInput');
        error = true;
      }else{
        document.querySelector('#calificacion_limpieza').classList.remove('errorInput');
      }

      return error
}
