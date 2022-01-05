'use strict';

let idHotel = localStorage.getItem('hotel');


let promedio_calificaciones = promedioCalificaciones();



//busca las calificaciones
let calificaciones = { hotel: promedio_calificaciones };


let cantidad_estrellas = 5;

for (let rating in calificaciones) {
  let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas *10;
  let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
  document.querySelector("." + rating + " .estrellas_calificadas").style.width = redondear_porcentaje; 
}

function promedioCalificaciones(){
    let hotel = buscar_hotel(idHotel);

    let calificaciones_sumadas = hotel['calificaciones_sumadas'];
    let calificaciones_totales = hotel['total_de_calificiones'];
  
    let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;


  
    return promedio_calificaciones;
  }