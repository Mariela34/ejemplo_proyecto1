'use strict';


function initMap(){
    
    
    let latitud = parseFloat(sessionStorage.getItem('latitudTemp'));
    let longitud = parseFloat(sessionStorage.getItem('longitudTemp'));

   

    let ubicacionInicial = {lat:  latitud, lng: longitud};
    let mapa = new google.maps.Map(
        document.getElementById('map'),
        {
            zoom : 16,
            center : ubicacionInicial,
        }
    );
    let marker =  new google.maps.Marker(
        {
            position : ubicacionInicial,
            map :  mapa,
            draggable : false
        }
    );
};

