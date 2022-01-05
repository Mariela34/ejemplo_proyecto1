'user strict';
const inputFiltrarHotel = document.querySelector('#textFiltroHotelCliente');
const mostrar_mapa = document.querySelector('.abrir_mapa');
let cuerpo_tabla_hoteles = document.querySelector('#tb_hoteles tbody');
const inputFiltrarProvincia = document.querySelector('#seleccionProvincia');
const inputFiltrarCanton = document.querySelector('#seleccionCanton');
const inputFiltrarDistrito  = document.querySelector('#seleccionDistrito');
const inputFiltrarRanking = document.querySelector('#seleccionRanking');



let id_usuario = sessionStorage.getItem('usuario');

mostrarlistaHoteles();
inputFiltrarHotel.addEventListener('keyup', mostrarlistaHoteles);
inputFiltrarRanking.addEventListener('change', mostrarDatosConRanking);

inputFiltrarProvincia.addEventListener('change', mostrarlistaHoteles);
inputFiltrarCanton.addEventListener('change', mostrarlistaHoteles);
inputFiltrarDistrito.addEventListener('change', mostrarlistaHoteles);


function mostrarlistaHoteles() {   
    
let listaHoteles = obtenerHoteles(); 
    

    let filtro_hotel =  inputFiltrarHotel.value;

    let filtro_provincia = inputFiltrarProvincia.value;
    let filtro_canton = inputFiltrarCanton.value;
    let filtro_distrito = inputFiltrarDistrito.value;
   

    for (let i = 0; i < provincias.length; i++) {
        if (filtro_provincia == provincias[i].idProvincia) {
            filtro_provincia = provincias[i].nombre;
        }
    }

    for (let i = 0; i < cantones.length; i++) {
        if (filtro_canton == cantones[i].idCanton) {
            filtro_canton = cantones[i].nombre;
        }
    }

    for (let i = 0; i < distritos.length; i++) {
        if (filtro_distrito == distritos[i].idDistrito) {
            filtro_distrito = distritos[i].nombre;
        }
    }

    cuerpo_tabla_hoteles.innerHTML= '';

    if(filtro_canton=='--Seleccione un cantón--' && filtro_provincia=='--Seleccione una provincia--' && filtro_distrito=='--Seleccione un distrito--' ) {
        for(let i = 0; i < listaHoteles.length; i++) {
            if(listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase())){
    
                if( listaHoteles[i]['estado'] != 'Desactivado'){
                    let fila = cuerpo_tabla_hoteles.insertRow();            
                                    
                
                
                    let celda_nombre_hotel = fila.insertCell();                    
                    let celda_ubicacion = fila.insertCell();
                    let celda_provincia = fila.insertCell();
                    let celda_canton = fila.insertCell();
                    let celda_distrito = fila.insertCell();
                    let celda_direccion = fila.insertCell();
                    let celda_rating = fila.insertCell();
        
                    
        
        
                    celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                    celda_ubicacion.innerHTML = '';
                    celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                    celda_canton.innerHTML = listaHoteles[i]['canton'];
                    celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                    celda_direccion.innerHTML =  listaHoteles[i]['direccion'];  
                    celda_rating.innerHTML = '';      
                    
                    
                    let ver_ubicacion = document.createElement('button');
                    ver_ubicacion.textContent = 'Ver ubicación';
        
                    ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
        
                    
                    let longitud = listaHoteles[i]['longitud_mapa'];
                    let latitud = listaHoteles[i]['latitud_mapa'];
        
        
                    ver_ubicacion.onclick = function(){
                        let nombreHotel = listaHoteles[i]['nombre_hotel'];
                        sessionStorage.setItem('nombre_hotel', nombreHotel);
                        sessionStorage.setItem('latitudTemp', latitud);
                        sessionStorage.setItem('longitudTemp', longitud);
                        sessionStorage.setItem('usuario', id_usuario);
                        
                        document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
                    }
        
                    celda_ubicacion.appendChild(ver_ubicacion);
    
                    let estrellas_sin_calificar = document.createElement('div');
                    estrellas_sin_calificar.setAttribute('class', 'estrellas_sin_calificar');
                    estrellas_sin_calificar.classList.add('estrellas_sin_calificar');
    
                    let estrellas_calificadas = document.createElement('div');
                    estrellas_calificadas.setAttribute('class', 'estrellas_calificadas');
    
                    estrellas_calificadas.classList.add('estrellas_calificadas');
    
                    let hacerCalificacion = document.createElement('button');
                    hacerCalificacion.setAttribute('type', 'button');
                    hacerCalificacion.textContent = 'Realizar calificación';
                    hacerCalificacion.dataset.id_hotel = listaHoteles[i]['_id'];
                    hacerCalificacion.classList.add('boton_hacer_calificacion');
    
                    hacerCalificacion.addEventListener('click', realizarCalificacion);
    
                    
    
                    let promedio_calificaciones = promedioCalificaciones();
    
    
    
                    //busca las calificaciones
                    let calificaciones = { hotel: promedio_calificaciones };
    
    
                    let cantidad_estrellas = 5;
    
                    for (let rating in calificaciones) {
                        let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas*10;
                        let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
                        estrellas_calificadas.style.width = redondear_porcentaje; 
                    }
    
                    function promedioCalificaciones(){
    
                        let calificaciones_sumadas = listaHoteles[i]['calificaciones_sumadas'];
                        let calificaciones_totales = listaHoteles[i]['total_de_calificiones'];
                    
                        let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;
    
    
                    
                        return promedio_calificaciones;
                    }
                    estrellas_sin_calificar.appendChild(estrellas_calificadas);
                    
                    
                    celda_rating.appendChild(estrellas_sin_calificar);
                    celda_rating.appendChild(hacerCalificacion);
                }
            }
        }
    }

    if(filtro_provincia!='--Seleccione una provincia--' && filtro_canton =='--Seleccione un cantón--' && filtro_distrito=='--Seleccione un distrito--' ){
        for(let i = 0; i < listaHoteles.length; i++) {
            if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase()) ){
    
                if( listaHoteles[i]['estado'] != 'Desactivado'){
                    let fila = cuerpo_tabla_hoteles.insertRow();            
                                    
                
                
                    let celda_nombre_hotel = fila.insertCell();                    
                    let celda_ubicacion = fila.insertCell();
                    let celda_provincia = fila.insertCell();
                    let celda_canton = fila.insertCell();
                    let celda_distrito = fila.insertCell();
                    let celda_direccion = fila.insertCell();
                    let celda_rating = fila.insertCell();
        
                    
        
        
                    celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                    celda_ubicacion.innerHTML = '';
                    celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                    celda_canton.innerHTML = listaHoteles[i]['canton'];
                    celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                    celda_direccion.innerHTML =  listaHoteles[i]['direccion'];  
                    celda_rating.innerHTML = '';      
                    
                    
                    let ver_ubicacion = document.createElement('button');
                    ver_ubicacion.textContent = 'Ver ubicación';
        
                    ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
        
                    
                    let longitud = listaHoteles[i]['longitud_mapa'];
                    let latitud = listaHoteles[i]['latitud_mapa'];
        
        
                    ver_ubicacion.onclick = function(){
                        let nombreHotel = listaHoteles[i]['nombre_hotel'];
                        sessionStorage.setItem('nombre_hotel', nombreHotel);
                        sessionStorage.setItem('latitudTemp', latitud);
                        sessionStorage.setItem('longitudTemp', longitud);
                        sessionStorage.setItem('usuario', id_usuario);
                        
                        document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
                    }
        
                    celda_ubicacion.appendChild(ver_ubicacion);
    
                    let estrellas_sin_calificar = document.createElement('div');
                    estrellas_sin_calificar.setAttribute('class', 'estrellas_sin_calificar');
                    estrellas_sin_calificar.classList.add('estrellas_sin_calificar');
    
                    let estrellas_calificadas = document.createElement('div');
                    estrellas_calificadas.setAttribute('class', 'estrellas_calificadas');
    
                    estrellas_calificadas.classList.add('estrellas_calificadas');
    
                    let hacerCalificacion = document.createElement('button');
                    hacerCalificacion.setAttribute('type', 'button');
                    hacerCalificacion.textContent = 'Realizar calificación';
                    hacerCalificacion.dataset.id_hotel = listaHoteles[i]['_id'];
                    hacerCalificacion.classList.add('boton_hacer_calificacion');
    
                    hacerCalificacion.addEventListener('click', realizarCalificacion);
    
                    
    
                    let promedio_calificaciones = promedioCalificaciones();
    
    
    
                    //busca las calificaciones
                    let calificaciones = { hotel: promedio_calificaciones };
    
    
                    let cantidad_estrellas = 5;
    
                    for (let rating in calificaciones) {
                        let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas*10;
                        let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
                        estrellas_calificadas.style.width = redondear_porcentaje; 
                    }
    
                    function promedioCalificaciones(){
    
                        let calificaciones_sumadas = listaHoteles[i]['calificaciones_sumadas'];
                        let calificaciones_totales = listaHoteles[i]['total_de_calificiones'];
                    
                        let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;
    
    
                    
                        return promedio_calificaciones;
                    }
                    estrellas_sin_calificar.appendChild(estrellas_calificadas);
                    
                    
                    celda_rating.appendChild(estrellas_sin_calificar);
                    celda_rating.appendChild(hacerCalificacion);
                }
            }
        }
    }

    if(filtro_provincia!='--Seleccione una provincia--' && filtro_canton !='--Seleccione un cantón--' && filtro_distrito=='--Seleccione un distrito--'){
        for(let i = 0; i < listaHoteles.length; i++) {
            if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['canton'].includes(filtro_canton) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase()) ){
    
                if( listaHoteles[i]['estado'] != 'Desactivado'){
                    let fila = cuerpo_tabla_hoteles.insertRow();            
                                    
                
                
                    let celda_nombre_hotel = fila.insertCell();                    
                    let celda_ubicacion = fila.insertCell();
                    let celda_provincia = fila.insertCell();
                    let celda_canton = fila.insertCell();
                    let celda_distrito = fila.insertCell();
                    let celda_direccion = fila.insertCell();
                    let celda_rating = fila.insertCell();
        
                    
        
        
                    celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                    celda_ubicacion.innerHTML = '';
                    celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                    celda_canton.innerHTML = listaHoteles[i]['canton'];
                    celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                    celda_direccion.innerHTML =  listaHoteles[i]['direccion'];  
                    celda_rating.innerHTML = '';      
                    
                    
                    let ver_ubicacion = document.createElement('button');
                    ver_ubicacion.textContent = 'Ver ubicación';
        
                    ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
        
                    
                    let longitud = listaHoteles[i]['longitud_mapa'];
                    let latitud = listaHoteles[i]['latitud_mapa'];
        
        
                    ver_ubicacion.onclick = function(){
                        let nombreHotel = listaHoteles[i]['nombre_hotel'];
                        sessionStorage.setItem('nombre_hotel', nombreHotel);
                        sessionStorage.setItem('latitudTemp', latitud);
                        sessionStorage.setItem('longitudTemp', longitud);
                        sessionStorage.setItem('usuario', id_usuario);
                        
                        document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
                    }
        
                    celda_ubicacion.appendChild(ver_ubicacion);
    
                    let estrellas_sin_calificar = document.createElement('div');
                    estrellas_sin_calificar.setAttribute('class', 'estrellas_sin_calificar');
                    estrellas_sin_calificar.classList.add('estrellas_sin_calificar');
    
                    let estrellas_calificadas = document.createElement('div');
                    estrellas_calificadas.setAttribute('class', 'estrellas_calificadas');
    
                    estrellas_calificadas.classList.add('estrellas_calificadas');
    
                    let hacerCalificacion = document.createElement('button');
                    hacerCalificacion.setAttribute('type', 'button');
                    hacerCalificacion.textContent = 'Realizar calificación';
                    hacerCalificacion.dataset.id_hotel = listaHoteles[i]['_id'];
                    hacerCalificacion.classList.add('boton_hacer_calificacion');
    
                    hacerCalificacion.addEventListener('click', realizarCalificacion);
    
                    
    
                    let promedio_calificaciones = promedioCalificaciones();
    
    
    
                    //busca las calificaciones
                    let calificaciones = { hotel: promedio_calificaciones };
    
    
                    let cantidad_estrellas = 5;
    
                    for (let rating in calificaciones) {
                        let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas*10;
                        let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
                        estrellas_calificadas.style.width = redondear_porcentaje; 
                    }
    
                    function promedioCalificaciones(){
    
                        let calificaciones_sumadas = listaHoteles[i]['calificaciones_sumadas'];
                        let calificaciones_totales = listaHoteles[i]['total_de_calificiones'];
                    
                        let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;
    
    
                    
                        return promedio_calificaciones;
                    }
                    estrellas_sin_calificar.appendChild(estrellas_calificadas);
                    
                    
                    celda_rating.appendChild(estrellas_sin_calificar);
                    celda_rating.appendChild(hacerCalificacion);
                }
            }
        }
    }
    
    if(filtro_canton!='--Seleccione un cantón--' && filtro_provincia!='--Seleccione una provincia--' && filtro_distrito!='--Seleccione un distrito--' ){
        for(let i = 0; i < listaHoteles.length; i++) {
            if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['canton'].includes(filtro_canton) && listaHoteles[i]['distrito'].includes(filtro_distrito) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase()) ){
    
                if( listaHoteles[i]['estado'] != 'Desactivado'){
                    let fila = cuerpo_tabla_hoteles.insertRow();            
                                    
                
                
                    let celda_nombre_hotel = fila.insertCell();                    
                    let celda_ubicacion = fila.insertCell();
                    let celda_provincia = fila.insertCell();
                    let celda_canton = fila.insertCell();
                    let celda_distrito = fila.insertCell();
                    let celda_direccion = fila.insertCell();
                    let celda_rating = fila.insertCell();
        
                    
        
        
                    celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                    celda_ubicacion.innerHTML = '';
                    celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                    celda_canton.innerHTML = listaHoteles[i]['canton'];
                    celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                    celda_direccion.innerHTML =  listaHoteles[i]['direccion'];  
                    celda_rating.innerHTML = '';      
                    
                    
                    let ver_ubicacion = document.createElement('button');
                    ver_ubicacion.textContent = 'Ver ubicación';
        
                    ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
        
                    
                    let longitud = listaHoteles[i]['longitud_mapa'];
                    let latitud = listaHoteles[i]['latitud_mapa'];
        
        
                    ver_ubicacion.onclick = function(){
                        let nombreHotel = listaHoteles[i]['nombre_hotel'];
                        sessionStorage.setItem('nombre_hotel', nombreHotel);
                        sessionStorage.setItem('latitudTemp', latitud);
                        sessionStorage.setItem('longitudTemp', longitud);
                        sessionStorage.setItem('usuario', id_usuario);
                        
                        document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
                    }
        
                    celda_ubicacion.appendChild(ver_ubicacion);
    
                    let estrellas_sin_calificar = document.createElement('div');
                    estrellas_sin_calificar.setAttribute('class', 'estrellas_sin_calificar');
                    estrellas_sin_calificar.classList.add('estrellas_sin_calificar');
    
                    let estrellas_calificadas = document.createElement('div');
                    estrellas_calificadas.setAttribute('class', 'estrellas_calificadas');
    
                    estrellas_calificadas.classList.add('estrellas_calificadas');
    
                    let hacerCalificacion = document.createElement('button');
                    hacerCalificacion.setAttribute('type', 'button');
                    hacerCalificacion.textContent = 'Realizar calificación';
                    hacerCalificacion.dataset.id_hotel = listaHoteles[i]['_id'];
                    hacerCalificacion.classList.add('boton_hacer_calificacion');
    
                    hacerCalificacion.addEventListener('click', realizarCalificacion);
    
                    
    
                    let promedio_calificaciones = promedioCalificaciones();
    
    
    
                    //busca las calificaciones
                    let calificaciones = { hotel: promedio_calificaciones };
    
    
                    let cantidad_estrellas = 5;
    
                    for (let rating in calificaciones) {
                        let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas*10;
                        let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
                        estrellas_calificadas.style.width = redondear_porcentaje; 
                    }
    
                    function promedioCalificaciones(){
    
                        let calificaciones_sumadas = listaHoteles[i]['calificaciones_sumadas'];
                        let calificaciones_totales = listaHoteles[i]['total_de_calificiones'];
                    
                        let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;
    
    
                    
                        return promedio_calificaciones;
                    }
                    estrellas_sin_calificar.appendChild(estrellas_calificadas);
                    
                    
                    celda_rating.appendChild(estrellas_sin_calificar);
                    celda_rating.appendChild(hacerCalificacion);
                }
            }
        }
    }

    
};


function mostrarDatosConRanking() {

    let filtroRanking = inputFiltrarRanking.value;

    if( filtroRanking == 'Mayor a menor' ){
        let listaHoteles = obtenerRankingMayorMenor();
        let filtro_hotel =  inputFiltrarHotel.value;

        let filtro_provincia = inputFiltrarProvincia.value;
        let filtro_canton = inputFiltrarCanton.value;
        let filtro_distrito = inputFiltrarDistrito.value;
    
        for (let i = 0; i < provincias.length; i++) {
            if (filtro_provincia == provincias[i].idProvincia) {
                filtro_provincia = provincias[i].nombre;
            }
        }
    
        for (let i = 0; i < cantones.length; i++) {
            if (filtro_canton == cantones[i].idCanton) {
                filtro_canton = cantones[i].nombre;
            }
        }
    
        for (let i = 0; i < distritos.length; i++) {
            if (filtro_distrito == distritos[i].idDistrito) {
                filtro_distrito = distritos[i].nombre;
            }
        }
    
        cuerpo_tabla_hoteles.innerHTML= '';
    
        if(filtro_canton=='--Seleccione un cantón--' && filtro_provincia=='--Seleccione una provincia--' && filtro_distrito=='--Seleccione un distrito--' ) {
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase())){
        
                    if( listaHoteles[i]['estado'] != 'Desactivado'){
                        let fila = cuerpo_tabla_hoteles.insertRow();            
                                        
                    
                    
                        let celda_nombre_hotel = fila.insertCell();                    
                        let celda_ubicacion = fila.insertCell();
                        let celda_provincia = fila.insertCell();
                        let celda_canton = fila.insertCell();
                        let celda_distrito = fila.insertCell();
                        let celda_direccion = fila.insertCell();
                        let celda_rating = fila.insertCell();
            
                        
            
            
                        celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                        celda_ubicacion.innerHTML = '';
                        celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                        celda_canton.innerHTML = listaHoteles[i]['canton'];
                        celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                        celda_direccion.innerHTML =  listaHoteles[i]['direccion'];  
                        celda_rating.innerHTML = '';      
                        
                        
                        let ver_ubicacion = document.createElement('button');
                        ver_ubicacion.textContent = 'Ver ubicación';
            
                        ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
            
                        
                        let longitud = listaHoteles[i]['longitud_mapa'];
                        let latitud = listaHoteles[i]['latitud_mapa'];
            
            
                        ver_ubicacion.onclick = function(){
                            let nombreHotel = listaHoteles[i]['nombre_hotel'];
                            sessionStorage.setItem('nombre_hotel', nombreHotel);
                            sessionStorage.setItem('latitudTemp', latitud);
                            sessionStorage.setItem('longitudTemp', longitud);
                            sessionStorage.setItem('usuario', id_usuario);
                            
                            document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
                        }
            
                        celda_ubicacion.appendChild(ver_ubicacion);
        
                        let estrellas_sin_calificar = document.createElement('div');
                        estrellas_sin_calificar.setAttribute('class', 'estrellas_sin_calificar');
                        estrellas_sin_calificar.classList.add('estrellas_sin_calificar');
        
                        let estrellas_calificadas = document.createElement('div');
                        estrellas_calificadas.setAttribute('class', 'estrellas_calificadas');
        
                        estrellas_calificadas.classList.add('estrellas_calificadas');
        
                        let hacerCalificacion = document.createElement('button');
                        hacerCalificacion.setAttribute('type', 'button');
                        hacerCalificacion.textContent = 'Realizar calificación';
                        hacerCalificacion.dataset.id_hotel = listaHoteles[i]['_id'];
                        hacerCalificacion.classList.add('boton_hacer_calificacion');
        
                        hacerCalificacion.addEventListener('click', realizarCalificacion);
        
                        
        
                        let promedio_calificaciones = promedioCalificaciones();
        
        
        
                        //busca las calificaciones
                        let calificaciones = { hotel: promedio_calificaciones };
        
        
                        let cantidad_estrellas = 5;
        
                        for (let rating in calificaciones) {
                            let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas*10;
                            let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
                            estrellas_calificadas.style.width = redondear_porcentaje; 
                        }
        
                        function promedioCalificaciones(){
        
                            let calificaciones_sumadas = listaHoteles[i]['calificaciones_sumadas'];
                            let calificaciones_totales = listaHoteles[i]['total_de_calificiones'];
                        
                            let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;
        
        
                        
                            return promedio_calificaciones;
                        }
                        estrellas_sin_calificar.appendChild(estrellas_calificadas);
                        
                        
                        celda_rating.appendChild(estrellas_sin_calificar);
                        celda_rating.appendChild(hacerCalificacion);
                    }
                }
            }
        }
    
        if(filtro_provincia!='--Seleccione una provincia--' && filtro_canton =='--Seleccione un cantón--' && filtro_distrito=='--Seleccione un distrito--' ){
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase()) ){
        
                    if( listaHoteles[i]['estado'] != 'Desactivado'){
                        let fila = cuerpo_tabla_hoteles.insertRow();            
                                        
                    
                    
                        let celda_nombre_hotel = fila.insertCell();                    
                        let celda_ubicacion = fila.insertCell();
                        let celda_provincia = fila.insertCell();
                        let celda_canton = fila.insertCell();
                        let celda_distrito = fila.insertCell();
                        let celda_direccion = fila.insertCell();
                        let celda_rating = fila.insertCell();
            
                        
            
            
                        celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                        celda_ubicacion.innerHTML = '';
                        celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                        celda_canton.innerHTML = listaHoteles[i]['canton'];
                        celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                        celda_direccion.innerHTML =  listaHoteles[i]['direccion'];  
                        celda_rating.innerHTML = '';      
                        
                        
                        let ver_ubicacion = document.createElement('button');
                        ver_ubicacion.textContent = 'Ver ubicación';
            
                        ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
            
                        
                        let longitud = listaHoteles[i]['longitud_mapa'];
                        let latitud = listaHoteles[i]['latitud_mapa'];
            
            
                        ver_ubicacion.onclick = function(){
                            let nombreHotel = listaHoteles[i]['nombre_hotel'];
                            sessionStorage.setItem('nombre_hotel', nombreHotel);
                            sessionStorage.setItem('latitudTemp', latitud);
                            sessionStorage.setItem('longitudTemp', longitud);
                            sessionStorage.setItem('usuario', id_usuario);
                            
                            document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
                        }
            
                        celda_ubicacion.appendChild(ver_ubicacion);
        
                        let estrellas_sin_calificar = document.createElement('div');
                        estrellas_sin_calificar.setAttribute('class', 'estrellas_sin_calificar');
                        estrellas_sin_calificar.classList.add('estrellas_sin_calificar');
        
                        let estrellas_calificadas = document.createElement('div');
                        estrellas_calificadas.setAttribute('class', 'estrellas_calificadas');
        
                        estrellas_calificadas.classList.add('estrellas_calificadas');
        
                        let hacerCalificacion = document.createElement('button');
                        hacerCalificacion.setAttribute('type', 'button');
                        hacerCalificacion.textContent = 'Realizar calificación';
                        hacerCalificacion.dataset.id_hotel = listaHoteles[i]['_id'];
                        hacerCalificacion.classList.add('boton_hacer_calificacion');
        
                        hacerCalificacion.addEventListener('click', realizarCalificacion);
        
                        
        
                        let promedio_calificaciones = promedioCalificaciones();
        
        
        
                        //busca las calificaciones
                        let calificaciones = { hotel: promedio_calificaciones };
        
        
                        let cantidad_estrellas = 5;
        
                        for (let rating in calificaciones) {
                            let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas*10;
                            let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
                            estrellas_calificadas.style.width = redondear_porcentaje; 
                        }
        
                        function promedioCalificaciones(){
        
                            let calificaciones_sumadas = listaHoteles[i]['calificaciones_sumadas'];
                            let calificaciones_totales = listaHoteles[i]['total_de_calificiones'];
                        
                            let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;
        
        
                        
                            return promedio_calificaciones;
                        }
                        estrellas_sin_calificar.appendChild(estrellas_calificadas);
                        
                        
                        celda_rating.appendChild(estrellas_sin_calificar);
                        celda_rating.appendChild(hacerCalificacion);
                    }
                }
            }
        }
    
    
        if(filtro_provincia!='--Seleccione una provincia--' && filtro_canton !='--Seleccione un cantón--' && filtro_distrito=='--Seleccione un distrito--'){
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['canton'].includes(filtro_canton) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase()) ){
        
                    if( listaHoteles[i]['estado'] != 'Desactivado'){
                        let fila = cuerpo_tabla_hoteles.insertRow();            
                                        
                    
                    
                        let celda_nombre_hotel = fila.insertCell();                    
                        let celda_ubicacion = fila.insertCell();
                        let celda_provincia = fila.insertCell();
                        let celda_canton = fila.insertCell();
                        let celda_distrito = fila.insertCell();
                        let celda_direccion = fila.insertCell();
                        let celda_rating = fila.insertCell();
            
                        
            
            
                        celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                        celda_ubicacion.innerHTML = '';
                        celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                        celda_canton.innerHTML = listaHoteles[i]['canton'];
                        celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                        celda_direccion.innerHTML =  listaHoteles[i]['direccion'];  
                        celda_rating.innerHTML = '';      
                        
                        
                        let ver_ubicacion = document.createElement('button');
                        ver_ubicacion.textContent = 'Ver ubicación';
            
                        ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
            
                        
                        let longitud = listaHoteles[i]['longitud_mapa'];
                        let latitud = listaHoteles[i]['latitud_mapa'];
            
            
                        ver_ubicacion.onclick = function(){
                            let nombreHotel = listaHoteles[i]['nombre_hotel'];
                            sessionStorage.setItem('nombre_hotel', nombreHotel);
                            sessionStorage.setItem('latitudTemp', latitud);
                            sessionStorage.setItem('longitudTemp', longitud);
                            sessionStorage.setItem('usuario', id_usuario);
                            
                            document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
                        }
            
                        celda_ubicacion.appendChild(ver_ubicacion);
        
                        let estrellas_sin_calificar = document.createElement('div');
                        estrellas_sin_calificar.setAttribute('class', 'estrellas_sin_calificar');
                        estrellas_sin_calificar.classList.add('estrellas_sin_calificar');
        
                        let estrellas_calificadas = document.createElement('div');
                        estrellas_calificadas.setAttribute('class', 'estrellas_calificadas');
        
                        estrellas_calificadas.classList.add('estrellas_calificadas');
        
                        let hacerCalificacion = document.createElement('button');
                        hacerCalificacion.setAttribute('type', 'button');
                        hacerCalificacion.textContent = 'Realizar calificación';
                        hacerCalificacion.dataset.id_hotel = listaHoteles[i]['_id'];
                        hacerCalificacion.classList.add('boton_hacer_calificacion');
        
                        hacerCalificacion.addEventListener('click', realizarCalificacion);
        
                        
        
                        let promedio_calificaciones = promedioCalificaciones();
        
        
        
                        //busca las calificaciones
                        let calificaciones = { hotel: promedio_calificaciones };
        
        
                        let cantidad_estrellas = 5;
        
                        for (let rating in calificaciones) {
                            let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas*10;
                            let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
                            estrellas_calificadas.style.width = redondear_porcentaje; 
                        }
        
                        function promedioCalificaciones(){
        
                            let calificaciones_sumadas = listaHoteles[i]['calificaciones_sumadas'];
                            let calificaciones_totales = listaHoteles[i]['total_de_calificiones'];
                        
                            let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;
        
        
                        
                            return promedio_calificaciones;
                        }
                        estrellas_sin_calificar.appendChild(estrellas_calificadas);
                        
                        
                        celda_rating.appendChild(estrellas_sin_calificar);
                        celda_rating.appendChild(hacerCalificacion);
                    }
                }
            }
        }
        
        if(filtro_canton!='--Seleccione un cantón--' && filtro_provincia!='--Seleccione una provincia--' && filtro_distrito!='--Seleccione un distrito--' ){
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['canton'].includes(filtro_canton) && listaHoteles[i]['distrito'].includes(filtro_distrito) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase()) ){
        
                    if( listaHoteles[i]['estado'] != 'Desactivado'){
                        let fila = cuerpo_tabla_hoteles.insertRow();            
                                        
                    
                    
                        let celda_nombre_hotel = fila.insertCell();                    
                        let celda_ubicacion = fila.insertCell();
                        let celda_provincia = fila.insertCell();
                        let celda_canton = fila.insertCell();
                        let celda_distrito = fila.insertCell();
                        let celda_direccion = fila.insertCell();
                        let celda_rating = fila.insertCell();
            
                        
            
            
                        celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                        celda_ubicacion.innerHTML = '';
                        celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                        celda_canton.innerHTML = listaHoteles[i]['canton'];
                        celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                        celda_direccion.innerHTML =  listaHoteles[i]['direccion'];  
                        celda_rating.innerHTML = '';      
                        
                        
                        let ver_ubicacion = document.createElement('button');
                        ver_ubicacion.textContent = 'Ver ubicación';
            
                        ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
            
                        
                        let longitud = listaHoteles[i]['longitud_mapa'];
                        let latitud = listaHoteles[i]['latitud_mapa'];
            
            
                        ver_ubicacion.onclick = function(){
                            let nombreHotel = listaHoteles[i]['nombre_hotel'];
                            sessionStorage.setItem('nombre_hotel', nombreHotel);
                            sessionStorage.setItem('latitudTemp', latitud);
                            sessionStorage.setItem('longitudTemp', longitud);
                            sessionStorage.setItem('usuario', id_usuario);
                            
                            document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
                        }
            
                        celda_ubicacion.appendChild(ver_ubicacion);
        
                        let estrellas_sin_calificar = document.createElement('div');
                        estrellas_sin_calificar.setAttribute('class', 'estrellas_sin_calificar');
                        estrellas_sin_calificar.classList.add('estrellas_sin_calificar');
        
                        let estrellas_calificadas = document.createElement('div');
                        estrellas_calificadas.setAttribute('class', 'estrellas_calificadas');
        
                        estrellas_calificadas.classList.add('estrellas_calificadas');
        
                        let hacerCalificacion = document.createElement('button');
                        hacerCalificacion.setAttribute('type', 'button');
                        hacerCalificacion.textContent = 'Realizar calificación';
                        hacerCalificacion.dataset.id_hotel = listaHoteles[i]['_id'];
                        hacerCalificacion.classList.add('boton_hacer_calificacion');
        
                        hacerCalificacion.addEventListener('click', realizarCalificacion);
        
                        
        
                        let promedio_calificaciones = promedioCalificaciones();
        
        
        
                        //busca las calificaciones
                        let calificaciones = { hotel: promedio_calificaciones };
        
        
                        let cantidad_estrellas = 5;
        
                        for (let rating in calificaciones) {
                            let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas*10;
                            let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
                            estrellas_calificadas.style.width = redondear_porcentaje; 
                        }
        
                        function promedioCalificaciones(){
        
                            let calificaciones_sumadas = listaHoteles[i]['calificaciones_sumadas'];
                            let calificaciones_totales = listaHoteles[i]['total_de_calificiones'];
                        
                            let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;
        
        
                        
                            return promedio_calificaciones;
                        }
                        estrellas_sin_calificar.appendChild(estrellas_calificadas);
                        
                        
                        celda_rating.appendChild(estrellas_sin_calificar);
                        celda_rating.appendChild(hacerCalificacion);
                    }
                }
            }
        }
    
    
    }

    
    if( filtroRanking == 'Menor a mayor' ){
        let listaHoteles = obtenerRankingMenorMayor();
        let filtro_hotel =  inputFiltrarHotel.value;

        let filtro_provincia = inputFiltrarProvincia.value;
        let filtro_canton = inputFiltrarCanton.value;
        let filtro_distrito = inputFiltrarDistrito.value;
        
    
        for (let i = 0; i < provincias.length; i++) {
            if (filtro_provincia == provincias[i].idProvincia) {
                filtro_provincia = provincias[i].nombre;
            }
        }
    
        for (let i = 0; i < cantones.length; i++) {
            if (filtro_canton == cantones[i].idCanton) {
                filtro_canton = cantones[i].nombre;
            }
        }
    
        for (let i = 0; i < distritos.length; i++) {
            if (filtro_distrito == distritos[i].idDistrito) {
                filtro_distrito = distritos[i].nombre;
            }
        }
    
        cuerpo_tabla_hoteles.innerHTML= '';
    
        if(filtro_canton=='--Seleccione un cantón--' && filtro_provincia=='--Seleccione una provincia--' && filtro_distrito=='--Seleccione un distrito--' ) {
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase())){
        
                    if( listaHoteles[i]['estado'] != 'Desactivado'){
                        let fila = cuerpo_tabla_hoteles.insertRow();            
                                        
                    
                    
                        let celda_nombre_hotel = fila.insertCell();                    
                        let celda_ubicacion = fila.insertCell();
                        let celda_provincia = fila.insertCell();
                        let celda_canton = fila.insertCell();
                        let celda_distrito = fila.insertCell();
                        let celda_direccion = fila.insertCell();
                        let celda_rating = fila.insertCell();
            
                        
            
            
                        celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                        celda_ubicacion.innerHTML = '';
                        celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                        celda_canton.innerHTML = listaHoteles[i]['canton'];
                        celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                        celda_direccion.innerHTML =  listaHoteles[i]['direccion'];  
                        celda_rating.innerHTML = '';      
                        
                        
                        let ver_ubicacion = document.createElement('button');
                        ver_ubicacion.textContent = 'Ver ubicación';
            
                        ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
            
                        
                        let longitud = listaHoteles[i]['longitud_mapa'];
                        let latitud = listaHoteles[i]['latitud_mapa'];
            
            
                        ver_ubicacion.onclick = function(){
                            let nombreHotel = listaHoteles[i]['nombre_hotel'];
                            sessionStorage.setItem('nombre_hotel', nombreHotel);
                            sessionStorage.setItem('latitudTemp', latitud);
                            sessionStorage.setItem('longitudTemp', longitud);
                            sessionStorage.setItem('usuario', id_usuario);
                            
                            document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
                        }
            
                        celda_ubicacion.appendChild(ver_ubicacion);
        
                        let estrellas_sin_calificar = document.createElement('div');
                        estrellas_sin_calificar.setAttribute('class', 'estrellas_sin_calificar');
                        estrellas_sin_calificar.classList.add('estrellas_sin_calificar');
        
                        let estrellas_calificadas = document.createElement('div');
                        estrellas_calificadas.setAttribute('class', 'estrellas_calificadas');
        
                        estrellas_calificadas.classList.add('estrellas_calificadas');
        
                        let hacerCalificacion = document.createElement('button');
                        hacerCalificacion.setAttribute('type', 'button');
                        hacerCalificacion.textContent = 'Realizar calificación';
                        hacerCalificacion.dataset.id_hotel = listaHoteles[i]['_id'];
                        hacerCalificacion.classList.add('boton_hacer_calificacion');
        
                        hacerCalificacion.addEventListener('click', realizarCalificacion);
        
                        
        
                        let promedio_calificaciones = promedioCalificaciones();
        
        
        
                        //busca las calificaciones
                        let calificaciones = { hotel: promedio_calificaciones };
        
        
                        let cantidad_estrellas = 5;
        
                        for (let rating in calificaciones) {
                            let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas*10;
                            let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
                            estrellas_calificadas.style.width = redondear_porcentaje; 
                        }
        
                        function promedioCalificaciones(){
        
                            let calificaciones_sumadas = listaHoteles[i]['calificaciones_sumadas'];
                            let calificaciones_totales = listaHoteles[i]['total_de_calificiones'];
                        
                            let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;
        
        
                        
                            return promedio_calificaciones;
                        }
                        estrellas_sin_calificar.appendChild(estrellas_calificadas);
                        
                        
                        celda_rating.appendChild(estrellas_sin_calificar);
                        celda_rating.appendChild(hacerCalificacion);
                    }
                }
            }
        }
    
        if(filtro_provincia!='--Seleccione una provincia--' && filtro_canton =='--Seleccione un cantón--' && filtro_distrito=='--Seleccione un distrito--' ){
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase()) ){
        
                    if( listaHoteles[i]['estado'] != 'Desactivado'){
                        let fila = cuerpo_tabla_hoteles.insertRow();            
                                        
                    
                    
                        let celda_nombre_hotel = fila.insertCell();                    
                        let celda_ubicacion = fila.insertCell();
                        let celda_provincia = fila.insertCell();
                        let celda_canton = fila.insertCell();
                        let celda_distrito = fila.insertCell();
                        let celda_direccion = fila.insertCell();
                        let celda_rating = fila.insertCell();
            
                        
            
            
                        celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                        celda_ubicacion.innerHTML = '';
                        celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                        celda_canton.innerHTML = listaHoteles[i]['canton'];
                        celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                        celda_direccion.innerHTML =  listaHoteles[i]['direccion'];  
                        celda_rating.innerHTML = '';      
                        
                        
                        let ver_ubicacion = document.createElement('button');
                        ver_ubicacion.textContent = 'Ver ubicación';
            
                        ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
            
                        
                        let longitud = listaHoteles[i]['longitud_mapa'];
                        let latitud = listaHoteles[i]['latitud_mapa'];
            
            
                        ver_ubicacion.onclick = function(){
                            let nombreHotel = listaHoteles[i]['nombre_hotel'];
                            sessionStorage.setItem('nombre_hotel', nombreHotel);
                            sessionStorage.setItem('latitudTemp', latitud);
                            sessionStorage.setItem('longitudTemp', longitud);
                            sessionStorage.setItem('usuario', id_usuario);
                            
                            document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
                        }
            
                        celda_ubicacion.appendChild(ver_ubicacion);
        
                        let estrellas_sin_calificar = document.createElement('div');
                        estrellas_sin_calificar.setAttribute('class', 'estrellas_sin_calificar');
                        estrellas_sin_calificar.classList.add('estrellas_sin_calificar');
        
                        let estrellas_calificadas = document.createElement('div');
                        estrellas_calificadas.setAttribute('class', 'estrellas_calificadas');
        
                        estrellas_calificadas.classList.add('estrellas_calificadas');
        
                        let hacerCalificacion = document.createElement('button');
                        hacerCalificacion.setAttribute('type', 'button');
                        hacerCalificacion.textContent = 'Realizar calificación';
                        hacerCalificacion.dataset.id_hotel = listaHoteles[i]['_id'];
                        hacerCalificacion.classList.add('boton_hacer_calificacion');
        
                        hacerCalificacion.addEventListener('click', realizarCalificacion);
        
                        
        
                        let promedio_calificaciones = promedioCalificaciones();
        
        
        
                        //busca las calificaciones
                        let calificaciones = { hotel: promedio_calificaciones };
        
        
                        let cantidad_estrellas = 5;
        
                        for (let rating in calificaciones) {
                            let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas*10;
                            let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
                            estrellas_calificadas.style.width = redondear_porcentaje; 
                        }
        
                        function promedioCalificaciones(){
        
                            let calificaciones_sumadas = listaHoteles[i]['calificaciones_sumadas'];
                            let calificaciones_totales = listaHoteles[i]['total_de_calificiones'];
                        
                            let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;
        
        
                        
                            return promedio_calificaciones;
                        }
                        estrellas_sin_calificar.appendChild(estrellas_calificadas);
                        
                        
                        celda_rating.appendChild(estrellas_sin_calificar);
                        celda_rating.appendChild(hacerCalificacion);
                    }
                }
            }
        }
    
    
        if(filtro_provincia!='--Seleccione una provincia--' && filtro_canton !='--Seleccione un cantón--' && filtro_distrito=='--Seleccione un distrito--'){
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['canton'].includes(filtro_canton) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase()) ){
        
                    if( listaHoteles[i]['estado'] != 'Desactivado'){
                        let fila = cuerpo_tabla_hoteles.insertRow();            
                                        
                    
                    
                        let celda_nombre_hotel = fila.insertCell();                    
                        let celda_ubicacion = fila.insertCell();
                        let celda_provincia = fila.insertCell();
                        let celda_canton = fila.insertCell();
                        let celda_distrito = fila.insertCell();
                        let celda_direccion = fila.insertCell();
                        let celda_rating = fila.insertCell();
            
                        
            
            
                        celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                        celda_ubicacion.innerHTML = '';
                        celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                        celda_canton.innerHTML = listaHoteles[i]['canton'];
                        celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                        celda_direccion.innerHTML =  listaHoteles[i]['direccion'];  
                        celda_rating.innerHTML = '';      
                        
                        
                        let ver_ubicacion = document.createElement('button');
                        ver_ubicacion.textContent = 'Ver ubicación';
            
                        ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
            
                        
                        let longitud = listaHoteles[i]['longitud_mapa'];
                        let latitud = listaHoteles[i]['latitud_mapa'];
            
            
                        ver_ubicacion.onclick = function(){
                            let nombreHotel = listaHoteles[i]['nombre_hotel'];
                            sessionStorage.setItem('nombre_hotel', nombreHotel);
                            sessionStorage.setItem('latitudTemp', latitud);
                            sessionStorage.setItem('longitudTemp', longitud);
                            sessionStorage.setItem('usuario', id_usuario);
                            
                            document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
                        }
            
                        celda_ubicacion.appendChild(ver_ubicacion);
        
                        let estrellas_sin_calificar = document.createElement('div');
                        estrellas_sin_calificar.setAttribute('class', 'estrellas_sin_calificar');
                        estrellas_sin_calificar.classList.add('estrellas_sin_calificar');
        
                        let estrellas_calificadas = document.createElement('div');
                        estrellas_calificadas.setAttribute('class', 'estrellas_calificadas');
        
                        estrellas_calificadas.classList.add('estrellas_calificadas');
        
                        let hacerCalificacion = document.createElement('button');
                        hacerCalificacion.setAttribute('type', 'button');
                        hacerCalificacion.textContent = 'Realizar calificación';
                        hacerCalificacion.dataset.id_hotel = listaHoteles[i]['_id'];
                        hacerCalificacion.classList.add('boton_hacer_calificacion');
        
                        hacerCalificacion.addEventListener('click', realizarCalificacion);
        
                        
        
                        let promedio_calificaciones = promedioCalificaciones();
        
        
        
                        //busca las calificaciones
                        let calificaciones = { hotel: promedio_calificaciones };
        
        
                        let cantidad_estrellas = 5;
        
                        for (let rating in calificaciones) {
                            let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas*10;
                            let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
                            estrellas_calificadas.style.width = redondear_porcentaje; 
                        }
        
                        function promedioCalificaciones(){
        
                            let calificaciones_sumadas = listaHoteles[i]['calificaciones_sumadas'];
                            let calificaciones_totales = listaHoteles[i]['total_de_calificiones'];
                        
                            let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;
        
        
                        
                            return promedio_calificaciones;
                        }
                        estrellas_sin_calificar.appendChild(estrellas_calificadas);
                        
                        
                        celda_rating.appendChild(estrellas_sin_calificar);
                        celda_rating.appendChild(hacerCalificacion);
                    }
                }
            }
        }
        
        if(filtro_canton!='--Seleccione un cantón--' && filtro_provincia!='--Seleccione una provincia--' && filtro_distrito!='--Seleccione un distrito--' ){
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['canton'].includes(filtro_canton) && listaHoteles[i]['distrito'].includes(filtro_distrito) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase()) ){
        
                    if( listaHoteles[i]['estado'] != 'Desactivado'){
                        let fila = cuerpo_tabla_hoteles.insertRow();            
                                        
                    
                    
                        let celda_nombre_hotel = fila.insertCell();                    
                        let celda_ubicacion = fila.insertCell();
                        let celda_provincia = fila.insertCell();
                        let celda_canton = fila.insertCell();
                        let celda_distrito = fila.insertCell();
                        let celda_direccion = fila.insertCell();
                        let celda_rating = fila.insertCell();
            
                        
            
            
                        celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                        celda_ubicacion.innerHTML = '';
                        celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                        celda_canton.innerHTML = listaHoteles[i]['canton'];
                        celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                        celda_direccion.innerHTML =  listaHoteles[i]['direccion'];  
                        celda_rating.innerHTML = '';      
                        
                        
                        let ver_ubicacion = document.createElement('button');
                        ver_ubicacion.textContent = 'Ver ubicación';
            
                        ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
            
                        
                        let longitud = listaHoteles[i]['longitud_mapa'];
                        let latitud = listaHoteles[i]['latitud_mapa'];
            
            
                        ver_ubicacion.onclick = function(){
                            let nombreHotel = listaHoteles[i]['nombre_hotel'];
                            sessionStorage.setItem('nombre_hotel', nombreHotel);
                            sessionStorage.setItem('latitudTemp', latitud);
                            sessionStorage.setItem('longitudTemp', longitud);
                            sessionStorage.setItem('usuario', id_usuario);
                            
                            document.location.href = 'http://localhost:3000/public/mapa_hotel.html';
                        }
            
                        celda_ubicacion.appendChild(ver_ubicacion);
        
                        let estrellas_sin_calificar = document.createElement('div');
                        estrellas_sin_calificar.setAttribute('class', 'estrellas_sin_calificar');
                        estrellas_sin_calificar.classList.add('estrellas_sin_calificar');
        
                        let estrellas_calificadas = document.createElement('div');
                        estrellas_calificadas.setAttribute('class', 'estrellas_calificadas');
        
                        estrellas_calificadas.classList.add('estrellas_calificadas');
        
                        let hacerCalificacion = document.createElement('button');
                        hacerCalificacion.setAttribute('type', 'button');
                        hacerCalificacion.textContent = 'Realizar calificación';
                        hacerCalificacion.dataset.id_hotel = listaHoteles[i]['_id'];
                        hacerCalificacion.classList.add('boton_hacer_calificacion');
        
                        hacerCalificacion.addEventListener('click', realizarCalificacion);
        
                        
        
                        let promedio_calificaciones = promedioCalificaciones();
        
        
        
                        //busca las calificaciones
                        let calificaciones = { hotel: promedio_calificaciones };
        
        
                        let cantidad_estrellas = 5;
        
                        for (let rating in calificaciones) {
                            let porcentaje_estrellas = calificaciones[rating] / cantidad_estrellas*10;
                            let redondear_porcentaje = Math.round(porcentaje_estrellas/10)*10+"%" ;
                            estrellas_calificadas.style.width = redondear_porcentaje; 
                        }
        
                        function promedioCalificaciones(){
        
                            let calificaciones_sumadas = listaHoteles[i]['calificaciones_sumadas'];
                            let calificaciones_totales = listaHoteles[i]['total_de_calificiones'];
                        
                            let promedio_calificaciones = calificaciones_sumadas / calificaciones_totales;
        
        
                        
                            return promedio_calificaciones;
                        }
                        estrellas_sin_calificar.appendChild(estrellas_calificadas);
                        
                        
                        celda_rating.appendChild(estrellas_sin_calificar);
                        celda_rating.appendChild(hacerCalificacion);
                    }
                }
            }
        }
    
    
    }

    if( filtroRanking == '--Seleccione un tipo de ranking--' ){
        mostrarlistaHoteles();
    }
}



function realizarCalificacion() {
    let id_hotel =  this.dataset.id_hotel;
    localStorage.setItem('hotel', id_hotel);
    window.location.href = 'card_hotel.html';
};