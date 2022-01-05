/*Mapa */
let marker;          
let coords = {};    

//Funcion principal
initMap = function () 
{
  navigator.geolocation.getCurrentPosition(
          function (position){
            coords =  {
              lng: position.coords.longitude,
              lat: position.coords.latitude
            };
            setMapa(coords); 
            
           
          },function(error){console.log(error);});
    



function setMapa (coords)
{   
      //Se crea una nueva instancia del objeto mapa
      let map = new google.maps.Map(document.getElementById('map'),
      {
        zoom: 12,
        center:new google.maps.LatLng(coords.lat,coords.lng),

      });

      //Creamos el marcador en el mapa con sus propiedades
      //para nuestro obetivo tenemos que poner el atributo draggable en true
      //position pondremos las mismas coordenas que obtuvimos en la geolocalización
      marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(coords.lat,coords.lng),

      });
      //agregamos un evento al marcador junto con la funcion callback al igual que el evento dragend que indica 
      //cuando el usuario a soltado el marcador
      marker.addListener('click', toggleBounce);
      
      marker.addListener( 'dragend', function (event)
      {
        //escribimos las coordenadas de la posicion actual del marcador dentro del input #coords
        latitud= document.getElementById("posicionY").value = this.getPosition().lat();
        longitud=document.getElementById("posicionX").value = this.getPosition().lng();
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