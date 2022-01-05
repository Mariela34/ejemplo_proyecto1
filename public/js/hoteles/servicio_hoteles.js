'use strict';

function registrar_hotel(pnombre_hotel, plongitud, platitud, pprovincia, pcanton, pdistrito, pdireccion){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_hotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            nombre_hotel  : pnombre_hotel,
            longitud_mapa : plongitud,
            latitud_mapa : platitud,
            provincia  : pprovincia,
            canton  : pcanton,
            distrito  : pdistrito, 
            direccion : pdireccion,
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

function obtenerHoteles() {
    let listaHoteles = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_hoteles',
        type: 'get', 
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        datatype: 'json', 
        async: false,
        data: {
        }
    });

    peticion.done(function(response){
        listaHoteles = response;
         
    });

    peticion.fail(function(response){

    });

    return listaHoteles;
};


function obtenerRankingMayorMenor() {
    let listaHoteles = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/obtenerRankingMayorMenor',
        type: 'get', 
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        datatype: 'json', 
        async: false,
        data: {
        }
    });

    peticion.done(function(response){
        listaHoteles = response;
         
    });

    peticion.fail(function(response){

    });

    return listaHoteles;
};


function obtenerRankingMenorMayor() {
    let listaHoteles = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/obtenerRankingMenorMayor',
        type: 'get', 
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        datatype: 'json', 
        async: false,
        data: {
        }
    });

    peticion.done(function(response){
        listaHoteles = response;
         
    });

    peticion.fail(function(response){

    });

    return listaHoteles;
};

function modificar_hotel(pid_hotel, pnombre_hotel, plongitud, platitud, pprovincia, pcanton, pdistrito, pdireccion){
    let respuesta = '';
    let peticion =$.ajax({
        url: 'http://localhost:4000/api/modificar_hotel',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async:false,
        data: {
            id: pid_hotel,
            nombre_hotel  : pnombre_hotel,
            longitud_mapa : plongitud,
            latitud_mapa : platitud,
            provincia  : pprovincia,
            canton  : pcanton,
            distrito  : pdistrito, 
            direccion : pdireccion,
        },
        beforeSend: function beforeSend() {
        },
        success: function success(response) {
            console.log('Modificación exitosa');
        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
    });

    peticion.done(function(response){
        respuesta =  response;

       
      });
    
      peticion.fail(function(){
        
      });

      return respuesta;
   
    
};

function eliminar_hotel(pid_hotel) {
    $.ajax({
        url: 'http://localhost:4000/api/eliminar_hotel',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pid_hotel
        },
        beforeSend: function beforeSend() {
            
        },
        success: function success(response) {
            
        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
    });
}

function desactivar_hotel(pid_hotel){
    $.ajax({
        url: 'http://localhost:4000/api/desactivar_hotel',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pid_hotel
        },
        beforeSend: function beforeSend() {
            
        },
        success: function success(response) {
            
        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
    });
};

function activar_hotel(pid_hotel){
    $.ajax({
        url: 'http://localhost:4000/api/activar_hotel',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pid_hotel
        },
        beforeSend: function beforeSend() {
            
        },
        success: function success(response) {
            
        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
    });
};

function buscar_hotel(pid_hotel) {
    let hotel = [];
    $.ajax({
        url: 'http://localhost:4000/api/buscar_hotel',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        data: {
            id : pid_hotel
            
        },
        beforeSend: function beforeSend() {
            
        },
        success: function success(response) {
            hotel = response;
            localStorage.setItem('nombre_hotel', response.nombre_hotel);
            localStorage.setItem('longitud_mapa', response.longitud_mapa);
            localStorage.setItem('latitud_mapa', response.latitud_mapa);
            localStorage.setItem('provincia', response.provincia);
            localStorage.setItem('canton', response.canton);
            localStorage.setItem('distrito', response.distrito);
            localStorage.setItem('direccion', response.direccion);
            localStorage.setItem('promedio_calificaciones', response.promedio_calificaciones);
            localStorage.setItem('calificaciones_sumadas', response.calificaciones_sumadas);
            localStorage.setItem('total_de_calificiones', response.total_de_calificiones);

        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
        
    });
    return hotel;
};



function obtener_provincias(){
    let provincias = [];
    let peticion = $.ajax({
        url: 'http://costa-rica-places.herokuapp.com/api/provinces',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false
      });
    
      peticion.done(function(response){
        provincias = response;
        


      });
    
      peticion.fail(function(response){
        provincias = response;
      });

     return provincias; 
};

function obtener_cantones(){
    let cantones = [];
    let peticion = $.ajax({
        url: 'http://costa-rica-places.herokuapp.com/api/cantons',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false
      });
    
      peticion.done(function(response){
        cantones = response;
      });
    
      peticion.fail(function(response){
        cantones = response;
      });

     return cantones; 
};

function obtener_distritos(){
    let distritos = [];
    let peticion = $.ajax({
        url: 'http://costa-rica-places.herokuapp.com/api/districts',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false
      });
    
      peticion.done(function(response){
        distritos = response;
      });
    
      peticion.fail(function(response){
        distritos = response;
      });

     return distritos; 
};



function calificar_hotel(pid_hotel, pcalificacion_comida_nueva, pcalificacion_calidad_servicio_nueva, pcalificacion_infraestuctura_nueva, pcalificacion_habitaciones_nueva, pcalificacion_limpieza_nueva, pcalificaciones_sumadas, pnueva_calificacion, ppromedio){
    $.ajax({
        url: 'http://localhost:4000/api/calificar_hotel',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            id : pid_hotel,
            calificacion_comida : pcalificacion_comida_nueva,
            calificacion_calidad_servicio : pcalificacion_calidad_servicio_nueva,
            calificacion_infraestuctura : pcalificacion_infraestuctura_nueva,
            calificacion_habitaciones : pcalificacion_habitaciones_nueva, 
            calificacion_limpieza : pcalificacion_limpieza_nueva,
            calificaciones_sumadas: pcalificaciones_sumadas, 
            total_de_calificiones: pnueva_calificacion,
            promedio_calificaciones: ppromedio
        },
        beforeSend: function beforeSend() {
            
        },
        success: function success(response) {
            
        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
    });
  };