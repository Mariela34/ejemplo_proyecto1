'user strict';
const inputFiltrarHotel = document.querySelector('#textFiltroHotel');
const mostrar_mapa = document.querySelector('.abrir_mapa');
let cuerpo_tabla_hoteles = document.querySelector('#tb_hoteles tbody');
const inputFiltrarProvincia = document.querySelector('#seleccionProvincia');
const inputFiltrarCanton = document.querySelector('#seleccionCanton');
const inputFiltrar = document.querySelector('#seleccionFiltro');
const inputOpcionesFiltrar = document.querySelectorAll('#seleccionFiltro options');
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
    
                let fila = cuerpo_tabla_hoteles.insertRow();            
                                
            
            
                let celda_nombre_hotel = fila.insertCell();                    
                let celda_ubicacion = fila.insertCell();
                let celda_provincia = fila.insertCell();
                let celda_canton = fila.insertCell();
                let celda_distrito = fila.insertCell();
                let celda_direccion = fila.insertCell();
                let celda_rating = fila.insertCell();

                let celda_opciones = fila.insertCell();
                celda_opciones.classList.add('opciones');
    
                
    
    
                celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                celda_ubicacion.innerHTML = '';
                celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                celda_canton.innerHTML = listaHoteles[i]['canton'];
                celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                celda_direccion.innerHTML =  listaHoteles[i]['direccion']; 
                celda_rating.innerHTML = '';      
                celda_opciones.innerHTML = '';      
                
                
                
                let ver_ubicacion = document.createElement('button');
                ver_ubicacion.textContent = 'Ver ubicación';
    
                ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
    
                
                let longitud = listaHoteles[i]['longitud_mapa'];
                let latitud = listaHoteles[i]['latitud_mapa'];
    
    
                ver_ubicacion.onclick = function(){
                    let nombreHotel = listaHoteles[i]['nombre_hotel']
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
    
                let mas_opciones =document.createElement('div');
                    mas_opciones.classList.add('centered');
                    mas_opciones.dataset.id_hotel =  listaHoteles[i]['_id'];
    
    
    
                let boton_mas_opciones =document.createElement('div');
                    boton_mas_opciones.classList.add('plus');
                    boton_mas_opciones.addEventListener('click', plusToggle);
    
                let espacio_opciones = document.createElement('div');
                    espacio_opciones.href = '#';
                    espacio_opciones.classList.add('plus__line');
                    espacio_opciones.classList.add('plus__line--v');
    
                let espacio_2 = document.createElement('div');
                    espacio_2.classList.add('plus__line');
                    espacio_2.classList.add('plus__line--h');
    
            //se crean opciones para modificar, habilitar o deshabilitar y eliminar
                let boton_editar = document.createElement('a');
                    // editar.href = 'modificar_usuario.html';
                    boton_editar.setAttribute('title', 'Modificar datos del libro');
                    boton_editar.classList.add('fas');
                    boton_editar.classList.add('fa-pen-square');
                    boton_editar.classList.add('plus__link');
                    boton_editar.dataset.id_hotel =  listaHoteles[i]['_id'];
    
                boton_editar.addEventListener('click', editarDatosModificar);
    
    
    
                    let boton_eliminar = document.createElement('a');
                    // eliminar.href = '#';
                    boton_eliminar.setAttribute('title', 'Eliminar libro');
                    boton_eliminar.classList.add('fas');
                    boton_eliminar.classList.add('fa-trash-alt');
                    boton_eliminar.classList.add('plus__link');
                    boton_eliminar.dataset.id_hotel =  listaHoteles[i]['_id'];
    
                    boton_eliminar.addEventListener('click', confirmarEliminar);
    
    
    
    
                    //si el estado del patrocinador es habilitado se va a mostar el boton de deshabilitar
                    if( listaHoteles[i]['estado'] == 'Activado'){
                        let boton_desactivar = document.createElement('a');
    
                        boton_desactivar.classList.add('far');
                        boton_desactivar.classList.add('fa-eye-slash');
                        boton_desactivar.classList.add('plus__link');
                        boton_desactivar.dataset.id_hotel =  listaHoteles[i]['_id'];
                        espacio_opciones.appendChild(boton_desactivar);
                        boton_desactivar.setAttribute('title', 'Desactivar hotel');
    
                        boton_desactivar.addEventListener('click', desactivarHotel);
    
                    } 
                    
            //si el estado no es igual a habilitado se va a mostar el boton de habilitar
                    
                    if( listaHoteles[i]['estado'] == 'Desactivado'){z
                        let boton_activar = document.createElement('a');
                        boton_activar.setAttribute('title', 'Activar hotel');
    
                        boton_activar.classList.add('far');
                        boton_activar.classList.add('fa-eye');
                        boton_activar.classList.add('plus__link');
                        boton_activar.dataset.id_hotel =  listaHoteles[i]['_id'];
                        espacio_opciones.appendChild(boton_activar);
    
                        boton_activar.addEventListener('click', activarHotel);
                    }
    
                    celda_opciones.appendChild(mas_opciones);
                    mas_opciones.appendChild(boton_mas_opciones);
                    boton_mas_opciones.appendChild(espacio_opciones);
                    espacio_opciones.appendChild(boton_editar);
                    espacio_opciones.appendChild(boton_eliminar);
                    
                    boton_mas_opciones.appendChild(espacio_2);
    
                    let ocultar = document.createElement('a');
                    // boton_ver_mas.href = '';
                    ocultar.classList.add('fas');
                    ocultar.classList.add('fa-minus');
                    ocultar.classList.add('plus__link');
                    ocultar.setAttribute('title', 'Ocultar menú');
                    
    
                    espacio_opciones.appendChild(ocultar);
    
                    //funcion para activar el menu
    
                    function plusToggle() {
                        boton_mas_opciones.classList.toggle('plus--active');
                    }
            }
        }
    }

    if(filtro_provincia!='--Seleccione una provincia--' && filtro_canton =='--Seleccione un cantón--' && filtro_distrito=='--Seleccione un distrito--' ){
        for(let i = 0; i < listaHoteles.length; i++) {
            if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase())) {
    
                let fila = cuerpo_tabla_hoteles.insertRow();            
                                
            
            
                let celda_nombre_hotel = fila.insertCell();                    
                let celda_ubicacion = fila.insertCell();
                let celda_provincia = fila.insertCell();
                let celda_canton = fila.insertCell();
                let celda_distrito = fila.insertCell();
                let celda_direccion = fila.insertCell();
                let celda_rating = fila.insertCell();

                let celda_opciones = fila.insertCell();
                celda_opciones.classList.add('opciones');
    
                
    
    
                celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                celda_ubicacion.innerHTML = '';
                celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                celda_canton.innerHTML = listaHoteles[i]['canton'];
                celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                celda_direccion.innerHTML =  listaHoteles[i]['direccion']; 
                celda_rating.innerHTML = '';      
                celda_opciones.innerHTML = '';       
                
                
                let ver_ubicacion = document.createElement('button');
                ver_ubicacion.textContent = 'Ver ubicación';
    
                ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
    
                
                let longitud = listaHoteles[i]['longitud_mapa'];
                let latitud = listaHoteles[i]['latitud_mapa'];
    
    
                ver_ubicacion.onclick = function(){
                    let nombreHotel = listaHoteles[i]['nombre_hotel']
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
    
    
                let mas_opciones =document.createElement('div');
                    mas_opciones.classList.add('centered');
                    mas_opciones.dataset.id_hotel =  listaHoteles[i]['_id'];
    
    
    
                let boton_mas_opciones =document.createElement('div');
                    boton_mas_opciones.classList.add('plus');
                    boton_mas_opciones.addEventListener('click', plusToggle);
    
                let espacio_opciones = document.createElement('div');
                    espacio_opciones.href = '#';
                    espacio_opciones.classList.add('plus__line');
                    espacio_opciones.classList.add('plus__line--v');
    
                let espacio_2 = document.createElement('div');
                    espacio_2.classList.add('plus__line');
                    espacio_2.classList.add('plus__line--h');
    
            //se crean opciones para modificar, habilitar o deshabilitar y eliminar
                let boton_editar = document.createElement('a');
                    // editar.href = 'modificar_usuario.html';
                    boton_editar.setAttribute('title', 'Modificar datos del libro');
                    boton_editar.classList.add('fas');
                    boton_editar.classList.add('fa-pen-square');
                    boton_editar.classList.add('plus__link');
                    boton_editar.dataset.id_hotel =  listaHoteles[i]['_id'];
    
                boton_editar.addEventListener('click', editarDatosModificar);
    
    
    
                    let boton_eliminar = document.createElement('a');
                    // eliminar.href = '#';
                    boton_eliminar.setAttribute('title', 'Eliminar libro');
                    boton_eliminar.classList.add('fas');
                    boton_eliminar.classList.add('fa-trash-alt');
                    boton_eliminar.classList.add('plus__link');
                    boton_eliminar.dataset.id_hotel =  listaHoteles[i]['_id'];
    
                    boton_eliminar.addEventListener('click', confirmarEliminar);
    
    
    
    
                    //si el estado del patrocinador es habilitado se va a mostar el boton de deshabilitar
                    if( listaHoteles[i]['estado'] == 'Activado'){
                        let boton_desactivar = document.createElement('a');
    
                        boton_desactivar.classList.add('far');
                        boton_desactivar.classList.add('fa-eye-slash');
                        boton_desactivar.classList.add('plus__link');
                        boton_desactivar.dataset.id_hotel =  listaHoteles[i]['_id'];
                        espacio_opciones.appendChild(boton_desactivar);
                        boton_desactivar.setAttribute('title', 'Desactivar hotel');
    
                        boton_desactivar.addEventListener('click', desactivarHotel);
    
                    } 
                    
            //si el estado no es igual a habilitado se va a mostar el boton de habilitar
                    
                    if( listaHoteles[i]['estado'] == 'Desactivado'){z
                        let boton_activar = document.createElement('a');
                        boton_activar.setAttribute('title', 'Activar hotel');
    
                        boton_activar.classList.add('far');
                        boton_activar.classList.add('fa-eye');
                        boton_activar.classList.add('plus__link');
                        boton_activar.dataset.id_hotel =  listaHoteles[i]['_id'];
                        espacio_opciones.appendChild(boton_activar);
    
                        boton_activar.addEventListener('click', activarHotel);
                    }
    
                    celda_opciones.appendChild(mas_opciones);
                    mas_opciones.appendChild(boton_mas_opciones);
                    boton_mas_opciones.appendChild(espacio_opciones);
                    espacio_opciones.appendChild(boton_editar);
                    espacio_opciones.appendChild(boton_eliminar);
                    
                    boton_mas_opciones.appendChild(espacio_2);
    
                    let ocultar = document.createElement('a');
                    // boton_ver_mas.href = '';
                    ocultar.classList.add('fas');
                    ocultar.classList.add('fa-minus');
                    ocultar.classList.add('plus__link');
                    ocultar.setAttribute('title', 'Ocultar menú');
                    
    
                    espacio_opciones.appendChild(ocultar);
    
                    //funcion para activar el menu
    
                    function plusToggle() {
                        boton_mas_opciones.classList.toggle('plus--active');
                    }
            }
        }
    }

    if(filtro_provincia!='--Seleccione una provincia--' && filtro_canton !='--Seleccione un cantón--' && filtro_distrito=='--Seleccione un distrito--'){
        for(let i = 0; i < listaHoteles.length; i++) {
            if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['canton'].includes(filtro_canton) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase()) ){
    
                let fila = cuerpo_tabla_hoteles.insertRow();            
                                
            
                let celda_nombre_hotel = fila.insertCell();                    
                let celda_ubicacion = fila.insertCell();
                let celda_provincia = fila.insertCell();
                let celda_canton = fila.insertCell();
                let celda_distrito = fila.insertCell();
                let celda_direccion = fila.insertCell();
                let celda_rating = fila.insertCell();

                let celda_opciones = fila.insertCell();
                celda_opciones.classList.add('opciones');
    
                
    
    
                celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                celda_ubicacion.innerHTML = '';
                celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                celda_canton.innerHTML = listaHoteles[i]['canton'];
                celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                celda_direccion.innerHTML =  listaHoteles[i]['direccion']; 
                celda_rating.innerHTML = '';      
                celda_opciones.innerHTML = '';   
                
                
                let ver_ubicacion = document.createElement('button');
                ver_ubicacion.textContent = 'Ver ubicación';
    
                ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
    
                
                let longitud = listaHoteles[i]['longitud_mapa'];
                let latitud = listaHoteles[i]['latitud_mapa'];
    
    
                ver_ubicacion.onclick = function(){
                    let nombreHotel = listaHoteles[i]['nombre_hotel']
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
    

                let mas_opciones =document.createElement('div');
                    mas_opciones.classList.add('centered');
                    mas_opciones.dataset.id_hotel =  listaHoteles[i]['_id'];
    
    
    
                let boton_mas_opciones =document.createElement('div');
                    boton_mas_opciones.classList.add('plus');
                    boton_mas_opciones.addEventListener('click', plusToggle);
    
                let espacio_opciones = document.createElement('div');
                    espacio_opciones.href = '#';
                    espacio_opciones.classList.add('plus__line');
                    espacio_opciones.classList.add('plus__line--v');
    
                let espacio_2 = document.createElement('div');
                    espacio_2.classList.add('plus__line');
                    espacio_2.classList.add('plus__line--h');
    
            //se crean opciones para modificar, habilitar o deshabilitar y eliminar
                let boton_editar = document.createElement('a');
                    // editar.href = 'modificar_usuario.html';
                    boton_editar.setAttribute('title', 'Modificar datos del libro');
                    boton_editar.classList.add('fas');
                    boton_editar.classList.add('fa-pen-square');
                    boton_editar.classList.add('plus__link');
                    boton_editar.dataset.id_hotel =  listaHoteles[i]['_id'];
    
                boton_editar.addEventListener('click', editarDatosModificar);
    
    
    
                    let boton_eliminar = document.createElement('a');
                    // eliminar.href = '#';
                    boton_eliminar.setAttribute('title', 'Eliminar libro');
                    boton_eliminar.classList.add('fas');
                    boton_eliminar.classList.add('fa-trash-alt');
                    boton_eliminar.classList.add('plus__link');
                    boton_eliminar.dataset.id_hotel =  listaHoteles[i]['_id'];
    
                    boton_eliminar.addEventListener('click', confirmarEliminar);
    
    
    
    
                    //si el estado del patrocinador es habilitado se va a mostar el boton de deshabilitar
                    if( listaHoteles[i]['estado'] == 'Activado'){
                        let boton_desactivar = document.createElement('a');
    
                        boton_desactivar.classList.add('far');
                        boton_desactivar.classList.add('fa-eye-slash');
                        boton_desactivar.classList.add('plus__link');
                        boton_desactivar.dataset.id_hotel =  listaHoteles[i]['_id'];
                        espacio_opciones.appendChild(boton_desactivar);
                        boton_desactivar.setAttribute('title', 'Desactivar hotel');
    
                        boton_desactivar.addEventListener('click', desactivarHotel);
    
                    } 
                    
            //si el estado no es igual a habilitado se va a mostar el boton de habilitar
                    
                    if( listaHoteles[i]['estado'] == 'Desactivado'){z
                        let boton_activar = document.createElement('a');
                        boton_activar.setAttribute('title', 'Activar hotel');
    
                        boton_activar.classList.add('far');
                        boton_activar.classList.add('fa-eye');
                        boton_activar.classList.add('plus__link');
                        boton_activar.dataset.id_hotel =  listaHoteles[i]['_id'];
                        espacio_opciones.appendChild(boton_activar);
    
                        boton_activar.addEventListener('click', activarHotel);
                    }
    
                    celda_opciones.appendChild(mas_opciones);
                    mas_opciones.appendChild(boton_mas_opciones);
                    boton_mas_opciones.appendChild(espacio_opciones);
                    espacio_opciones.appendChild(boton_editar);
                    espacio_opciones.appendChild(boton_eliminar);
                    
                    boton_mas_opciones.appendChild(espacio_2);
    
                    let ocultar = document.createElement('a');
                    // boton_ver_mas.href = '';
                    ocultar.classList.add('fas');
                    ocultar.classList.add('fa-minus');
                    ocultar.classList.add('plus__link');
                    ocultar.setAttribute('title', 'Ocultar menú');
                    
    
                    espacio_opciones.appendChild(ocultar);
    
                    //funcion para activar el menu
    
                    function plusToggle() {
                        boton_mas_opciones.classList.toggle('plus--active');
                    }
            }
        }
    }

    if(filtro_canton!='--Seleccione un cantón--' && filtro_provincia!='--Seleccione una provincia--' && filtro_distrito!='--Seleccione un distrito--' ){
        for(let i = 0; i < listaHoteles.length; i++) {
            if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['canton'].includes(filtro_canton) && listaHoteles[i]['distrito'].includes(filtro_distrito) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase())){
    
                let fila = cuerpo_tabla_hoteles.insertRow();            
                                
            
            
                let celda_nombre_hotel = fila.insertCell();                    
                let celda_ubicacion = fila.insertCell();
                let celda_provincia = fila.insertCell();
                let celda_canton = fila.insertCell();
                let celda_distrito = fila.insertCell();
                let celda_direccion = fila.insertCell();
                let celda_rating = fila.insertCell();

                let celda_opciones = fila.insertCell();
                celda_opciones.classList.add('opciones');
    
                
    
    
                celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                celda_ubicacion.innerHTML = '';
                celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                celda_canton.innerHTML = listaHoteles[i]['canton'];
                celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                celda_direccion.innerHTML =  listaHoteles[i]['direccion']; 
                celda_rating.innerHTML = '';      
                celda_opciones.innerHTML = '';       
                
                
                let ver_ubicacion = document.createElement('button');
                ver_ubicacion.textContent = 'Ver ubicación';
    
                ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
    
                
                let longitud = listaHoteles[i]['longitud_mapa'];
                let latitud = listaHoteles[i]['latitud_mapa'];
    
    
                ver_ubicacion.onclick = function(){
                    let nombreHotel = listaHoteles[i]['nombre_hotel']
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
    
    
                let mas_opciones =document.createElement('div');
                    mas_opciones.classList.add('centered');
                    mas_opciones.dataset.id_hotel =  listaHoteles[i]['_id'];
    
    
    
                let boton_mas_opciones =document.createElement('div');
                    boton_mas_opciones.classList.add('plus');
                    boton_mas_opciones.addEventListener('click', plusToggle);
    
                let espacio_opciones = document.createElement('div');
                    espacio_opciones.href = '#';
                    espacio_opciones.classList.add('plus__line');
                    espacio_opciones.classList.add('plus__line--v');
    
                let espacio_2 = document.createElement('div');
                    espacio_2.classList.add('plus__line');
                    espacio_2.classList.add('plus__line--h');
    
            //se crean opciones para modificar, habilitar o deshabilitar y eliminar
                let boton_editar = document.createElement('a');
                    // editar.href = 'modificar_usuario.html';
                    boton_editar.setAttribute('title', 'Modificar datos del libro');
                    boton_editar.classList.add('fas');
                    boton_editar.classList.add('fa-pen-square');
                    boton_editar.classList.add('plus__link');
                    boton_editar.dataset.id_hotel =  listaHoteles[i]['_id'];
    
                boton_editar.addEventListener('click', editarDatosModificar);
    
    
    
                    let boton_eliminar = document.createElement('a');
                    // eliminar.href = '#';
                    boton_eliminar.setAttribute('title', 'Eliminar libro');
                    boton_eliminar.classList.add('fas');
                    boton_eliminar.classList.add('fa-trash-alt');
                    boton_eliminar.classList.add('plus__link');
                    boton_eliminar.dataset.id_hotel =  listaHoteles[i]['_id'];
    
                    boton_eliminar.addEventListener('click', confirmarEliminar);
    
    
    
    
                    //si el estado del patrocinador es habilitado se va a mostar el boton de deshabilitar
                    if( listaHoteles[i]['estado'] == 'Activado'){
                        let boton_desactivar = document.createElement('a');
    
                        boton_desactivar.classList.add('far');
                        boton_desactivar.classList.add('fa-eye-slash');
                        boton_desactivar.classList.add('plus__link');
                        boton_desactivar.dataset.id_hotel =  listaHoteles[i]['_id'];
                        espacio_opciones.appendChild(boton_desactivar);
                        boton_desactivar.setAttribute('title', 'Desactivar hotel');
    
                        boton_desactivar.addEventListener('click', desactivarHotel);
    
                    } 
                    
            //si el estado no es igual a habilitado se va a mostar el boton de habilitar
                    
                    if( listaHoteles[i]['estado'] == 'Desactivado'){z
                        let boton_activar = document.createElement('a');
                        boton_activar.setAttribute('title', 'Activar hotel');
    
                        boton_activar.classList.add('far');
                        boton_activar.classList.add('fa-eye');
                        boton_activar.classList.add('plus__link');
                        boton_activar.dataset.id_hotel =  listaHoteles[i]['_id'];
                        espacio_opciones.appendChild(boton_activar);
    
                        boton_activar.addEventListener('click', activarHotel);
                    }
    
                    celda_opciones.appendChild(mas_opciones);
                    mas_opciones.appendChild(boton_mas_opciones);
                    boton_mas_opciones.appendChild(espacio_opciones);
                    espacio_opciones.appendChild(boton_editar);
                    espacio_opciones.appendChild(boton_eliminar);
                    
                    boton_mas_opciones.appendChild(espacio_2);
    
                    let ocultar = document.createElement('a');
                    // boton_ver_mas.href = '';
                    ocultar.classList.add('fas');
                    ocultar.classList.add('fa-minus');
                    ocultar.classList.add('plus__link');
                    ocultar.setAttribute('title', 'Ocultar menú');
                    
    
                    espacio_opciones.appendChild(ocultar);
    
                    //funcion para activar el menu
    
                    function plusToggle() {
                        boton_mas_opciones.classList.toggle('plus--active');
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
        
                    let fila = cuerpo_tabla_hoteles.insertRow();            
                                    
                
                
                    let celda_nombre_hotel = fila.insertCell();                    
                    let celda_ubicacion = fila.insertCell();
                    let celda_provincia = fila.insertCell();
                    let celda_canton = fila.insertCell();
                    let celda_distrito = fila.insertCell();
                    let celda_direccion = fila.insertCell();
                    let celda_rating = fila.insertCell();
    
                    let celda_opciones = fila.insertCell();
                    celda_opciones.classList.add('opciones');
        
                    
        
        
                    celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                    celda_ubicacion.innerHTML = '';
                    celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                    celda_canton.innerHTML = listaHoteles[i]['canton'];
                    celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                    celda_direccion.innerHTML =  listaHoteles[i]['direccion']; 
                    celda_rating.innerHTML = '';      
                    celda_opciones.innerHTML = '';      
                    
                    
                    
                    let ver_ubicacion = document.createElement('button');
                    ver_ubicacion.textContent = 'Ver ubicación';
        
                    ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
        
                    
                    let longitud = listaHoteles[i]['longitud_mapa'];
                    let latitud = listaHoteles[i]['latitud_mapa'];
        
        
                    ver_ubicacion.onclick = function(){
                        let nombreHotel = listaHoteles[i]['nombre_hotel']
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
        
                    let mas_opciones =document.createElement('div');
                        mas_opciones.classList.add('centered');
                        mas_opciones.dataset.id_hotel =  listaHoteles[i]['_id'];
        
        
        
                    let boton_mas_opciones =document.createElement('div');
                        boton_mas_opciones.classList.add('plus');
                        boton_mas_opciones.addEventListener('click', plusToggle);
        
                    let espacio_opciones = document.createElement('div');
                        espacio_opciones.href = '#';
                        espacio_opciones.classList.add('plus__line');
                        espacio_opciones.classList.add('plus__line--v');
        
                    let espacio_2 = document.createElement('div');
                        espacio_2.classList.add('plus__line');
                        espacio_2.classList.add('plus__line--h');
        
                //se crean opciones para modificar, habilitar o deshabilitar y eliminar
                    let boton_editar = document.createElement('a');
                        // editar.href = 'modificar_usuario.html';
                        boton_editar.setAttribute('title', 'Modificar datos del libro');
                        boton_editar.classList.add('fas');
                        boton_editar.classList.add('fa-pen-square');
                        boton_editar.classList.add('plus__link');
                        boton_editar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                    boton_editar.addEventListener('click', editarDatosModificar);
        
        
        
                        let boton_eliminar = document.createElement('a');
                        // eliminar.href = '#';
                        boton_eliminar.setAttribute('title', 'Eliminar libro');
                        boton_eliminar.classList.add('fas');
                        boton_eliminar.classList.add('fa-trash-alt');
                        boton_eliminar.classList.add('plus__link');
                        boton_eliminar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                        boton_eliminar.addEventListener('click', confirmarEliminar);
        
        
        
        
                        //si el estado del patrocinador es habilitado se va a mostar el boton de deshabilitar
                        if( listaHoteles[i]['estado'] == 'Activado'){
                            let boton_desactivar = document.createElement('a');
        
                            boton_desactivar.classList.add('far');
                            boton_desactivar.classList.add('fa-eye-slash');
                            boton_desactivar.classList.add('plus__link');
                            boton_desactivar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_desactivar);
                            boton_desactivar.setAttribute('title', 'Desactivar hotel');
        
                            boton_desactivar.addEventListener('click', desactivarHotel);
        
                        } 
                        
                //si el estado no es igual a habilitado se va a mostar el boton de habilitar
                        
                        if( listaHoteles[i]['estado'] == 'Desactivado'){z
                            let boton_activar = document.createElement('a');
                            boton_activar.setAttribute('title', 'Activar hotel');
        
                            boton_activar.classList.add('far');
                            boton_activar.classList.add('fa-eye');
                            boton_activar.classList.add('plus__link');
                            boton_activar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_activar);
        
                            boton_activar.addEventListener('click', activarHotel);
                        }
        
                        celda_opciones.appendChild(mas_opciones);
                        mas_opciones.appendChild(boton_mas_opciones);
                        boton_mas_opciones.appendChild(espacio_opciones);
                        espacio_opciones.appendChild(boton_editar);
                        espacio_opciones.appendChild(boton_eliminar);
                        
                        boton_mas_opciones.appendChild(espacio_2);
        
                        let ocultar = document.createElement('a');
                        // boton_ver_mas.href = '';
                        ocultar.classList.add('fas');
                        ocultar.classList.add('fa-minus');
                        ocultar.classList.add('plus__link');
                        ocultar.setAttribute('title', 'Ocultar menú');
                        
        
                        espacio_opciones.appendChild(ocultar);
        
                        //funcion para activar el menu
        
                        function plusToggle() {
                            boton_mas_opciones.classList.toggle('plus--active');
                        }
                }
            }
        }
    
        if(filtro_provincia!='--Seleccione una provincia--' && filtro_canton =='--Seleccione un cantón--' && filtro_distrito=='--Seleccione un distrito--' ){
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase())) {
        
                    let fila = cuerpo_tabla_hoteles.insertRow();            
                                    
                
                
                    let celda_nombre_hotel = fila.insertCell();                    
                    let celda_ubicacion = fila.insertCell();
                    let celda_provincia = fila.insertCell();
                    let celda_canton = fila.insertCell();
                    let celda_distrito = fila.insertCell();
                    let celda_direccion = fila.insertCell();
                    let celda_rating = fila.insertCell();
    
                    let celda_opciones = fila.insertCell();
                    celda_opciones.classList.add('opciones');
        
                    
        
        
                    celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                    celda_ubicacion.innerHTML = '';
                    celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                    celda_canton.innerHTML = listaHoteles[i]['canton'];
                    celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                    celda_direccion.innerHTML =  listaHoteles[i]['direccion']; 
                    celda_rating.innerHTML = '';      
                    celda_opciones.innerHTML = '';       
                    
                    
                    let ver_ubicacion = document.createElement('button');
                    ver_ubicacion.textContent = 'Ver ubicación';
        
                    ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
        
                    
                    let longitud = listaHoteles[i]['longitud_mapa'];
                    let latitud = listaHoteles[i]['latitud_mapa'];
        
        
                    ver_ubicacion.onclick = function(){
                        let nombreHotel = listaHoteles[i]['nombre_hotel']
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
        
        
                    let mas_opciones =document.createElement('div');
                        mas_opciones.classList.add('centered');
                        mas_opciones.dataset.id_hotel =  listaHoteles[i]['_id'];
        
        
        
                    let boton_mas_opciones =document.createElement('div');
                        boton_mas_opciones.classList.add('plus');
                        boton_mas_opciones.addEventListener('click', plusToggle);
        
                    let espacio_opciones = document.createElement('div');
                        espacio_opciones.href = '#';
                        espacio_opciones.classList.add('plus__line');
                        espacio_opciones.classList.add('plus__line--v');
        
                    let espacio_2 = document.createElement('div');
                        espacio_2.classList.add('plus__line');
                        espacio_2.classList.add('plus__line--h');
        
                //se crean opciones para modificar, habilitar o deshabilitar y eliminar
                    let boton_editar = document.createElement('a');
                        // editar.href = 'modificar_usuario.html';
                        boton_editar.setAttribute('title', 'Modificar datos del libro');
                        boton_editar.classList.add('fas');
                        boton_editar.classList.add('fa-pen-square');
                        boton_editar.classList.add('plus__link');
                        boton_editar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                    boton_editar.addEventListener('click', editarDatosModificar);
        
        
        
                        let boton_eliminar = document.createElement('a');
                        // eliminar.href = '#';
                        boton_eliminar.setAttribute('title', 'Eliminar libro');
                        boton_eliminar.classList.add('fas');
                        boton_eliminar.classList.add('fa-trash-alt');
                        boton_eliminar.classList.add('plus__link');
                        boton_eliminar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                        boton_eliminar.addEventListener('click', confirmarEliminar);
        
        
        
        
                        //si el estado del patrocinador es habilitado se va a mostar el boton de deshabilitar
                        if( listaHoteles[i]['estado'] == 'Activado'){
                            let boton_desactivar = document.createElement('a');
        
                            boton_desactivar.classList.add('far');
                            boton_desactivar.classList.add('fa-eye-slash');
                            boton_desactivar.classList.add('plus__link');
                            boton_desactivar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_desactivar);
                            boton_desactivar.setAttribute('title', 'Desactivar hotel');
        
                            boton_desactivar.addEventListener('click', desactivarHotel);
        
                        } 
                        
                //si el estado no es igual a habilitado se va a mostar el boton de habilitar
                        
                        if( listaHoteles[i]['estado'] == 'Desactivado'){z
                            let boton_activar = document.createElement('a');
                            boton_activar.setAttribute('title', 'Activar hotel');
        
                            boton_activar.classList.add('far');
                            boton_activar.classList.add('fa-eye');
                            boton_activar.classList.add('plus__link');
                            boton_activar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_activar);
        
                            boton_activar.addEventListener('click', activarHotel);
                        }
        
                        celda_opciones.appendChild(mas_opciones);
                        mas_opciones.appendChild(boton_mas_opciones);
                        boton_mas_opciones.appendChild(espacio_opciones);
                        espacio_opciones.appendChild(boton_editar);
                        espacio_opciones.appendChild(boton_eliminar);
                        
                        boton_mas_opciones.appendChild(espacio_2);
        
                        let ocultar = document.createElement('a');
                        // boton_ver_mas.href = '';
                        ocultar.classList.add('fas');
                        ocultar.classList.add('fa-minus');
                        ocultar.classList.add('plus__link');
                        ocultar.setAttribute('title', 'Ocultar menú');
                        
        
                        espacio_opciones.appendChild(ocultar);
        
                        //funcion para activar el menu
        
                        function plusToggle() {
                            boton_mas_opciones.classList.toggle('plus--active');
                        }
                }
            }
        }
    
        if(filtro_provincia!='--Seleccione una provincia--' && filtro_canton !='--Seleccione un cantón--' && filtro_distrito=='--Seleccione un distrito--'){
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['canton'].includes(filtro_canton) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase()) ){
        
                    let fila = cuerpo_tabla_hoteles.insertRow();            
                                    
                
                    let celda_nombre_hotel = fila.insertCell();                    
                    let celda_ubicacion = fila.insertCell();
                    let celda_provincia = fila.insertCell();
                    let celda_canton = fila.insertCell();
                    let celda_distrito = fila.insertCell();
                    let celda_direccion = fila.insertCell();
                    let celda_rating = fila.insertCell();
    
                    let celda_opciones = fila.insertCell();
                    celda_opciones.classList.add('opciones');
        
                    
        
        
                    celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                    celda_ubicacion.innerHTML = '';
                    celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                    celda_canton.innerHTML = listaHoteles[i]['canton'];
                    celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                    celda_direccion.innerHTML =  listaHoteles[i]['direccion']; 
                    celda_rating.innerHTML = '';      
                    celda_opciones.innerHTML = '';   
                    
                    
                    let ver_ubicacion = document.createElement('button');
                    ver_ubicacion.textContent = 'Ver ubicación';
        
                    ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
        
                    
                    let longitud = listaHoteles[i]['longitud_mapa'];
                    let latitud = listaHoteles[i]['latitud_mapa'];
        
        
                    ver_ubicacion.onclick = function(){
                        let nombreHotel = listaHoteles[i]['nombre_hotel']
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
        
    
                    let mas_opciones =document.createElement('div');
                        mas_opciones.classList.add('centered');
                        mas_opciones.dataset.id_hotel =  listaHoteles[i]['_id'];
        
        
        
                    let boton_mas_opciones =document.createElement('div');
                        boton_mas_opciones.classList.add('plus');
                        boton_mas_opciones.addEventListener('click', plusToggle);
        
                    let espacio_opciones = document.createElement('div');
                        espacio_opciones.href = '#';
                        espacio_opciones.classList.add('plus__line');
                        espacio_opciones.classList.add('plus__line--v');
        
                    let espacio_2 = document.createElement('div');
                        espacio_2.classList.add('plus__line');
                        espacio_2.classList.add('plus__line--h');
        
                //se crean opciones para modificar, habilitar o deshabilitar y eliminar
                    let boton_editar = document.createElement('a');
                        // editar.href = 'modificar_usuario.html';
                        boton_editar.setAttribute('title', 'Modificar datos del libro');
                        boton_editar.classList.add('fas');
                        boton_editar.classList.add('fa-pen-square');
                        boton_editar.classList.add('plus__link');
                        boton_editar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                    boton_editar.addEventListener('click', editarDatosModificar);
        
        
        
                        let boton_eliminar = document.createElement('a');
                        // eliminar.href = '#';
                        boton_eliminar.setAttribute('title', 'Eliminar libro');
                        boton_eliminar.classList.add('fas');
                        boton_eliminar.classList.add('fa-trash-alt');
                        boton_eliminar.classList.add('plus__link');
                        boton_eliminar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                        boton_eliminar.addEventListener('click', confirmarEliminar);
        
        
        
        
                        //si el estado del patrocinador es habilitado se va a mostar el boton de deshabilitar
                        if( listaHoteles[i]['estado'] == 'Activado'){
                            let boton_desactivar = document.createElement('a');
        
                            boton_desactivar.classList.add('far');
                            boton_desactivar.classList.add('fa-eye-slash');
                            boton_desactivar.classList.add('plus__link');
                            boton_desactivar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_desactivar);
                            boton_desactivar.setAttribute('title', 'Desactivar hotel');
        
                            boton_desactivar.addEventListener('click', desactivarHotel);
        
                        } 
                        
                //si el estado no es igual a habilitado se va a mostar el boton de habilitar
                        
                        if( listaHoteles[i]['estado'] == 'Desactivado'){z
                            let boton_activar = document.createElement('a');
                            boton_activar.setAttribute('title', 'Activar hotel');
        
                            boton_activar.classList.add('far');
                            boton_activar.classList.add('fa-eye');
                            boton_activar.classList.add('plus__link');
                            boton_activar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_activar);
        
                            boton_activar.addEventListener('click', activarHotel);
                        }
        
                        celda_opciones.appendChild(mas_opciones);
                        mas_opciones.appendChild(boton_mas_opciones);
                        boton_mas_opciones.appendChild(espacio_opciones);
                        espacio_opciones.appendChild(boton_editar);
                        espacio_opciones.appendChild(boton_eliminar);
                        
                        boton_mas_opciones.appendChild(espacio_2);
        
                        let ocultar = document.createElement('a');
                        // boton_ver_mas.href = '';
                        ocultar.classList.add('fas');
                        ocultar.classList.add('fa-minus');
                        ocultar.classList.add('plus__link');
                        ocultar.setAttribute('title', 'Ocultar menú');
                        
        
                        espacio_opciones.appendChild(ocultar);
        
                        //funcion para activar el menu
        
                        function plusToggle() {
                            boton_mas_opciones.classList.toggle('plus--active');
                        }
                }
            }
        }
    
        if(filtro_canton!='--Seleccione un cantón--' && filtro_provincia!='--Seleccione una provincia--' && filtro_distrito!='--Seleccione un distrito--' ){
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['canton'].includes(filtro_canton) && listaHoteles[i]['distrito'].includes(filtro_distrito) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase())){
        
                    let fila = cuerpo_tabla_hoteles.insertRow();            
                                    
                
                
                    let celda_nombre_hotel = fila.insertCell();                    
                    let celda_ubicacion = fila.insertCell();
                    let celda_provincia = fila.insertCell();
                    let celda_canton = fila.insertCell();
                    let celda_distrito = fila.insertCell();
                    let celda_direccion = fila.insertCell();
                    let celda_rating = fila.insertCell();
    
                    let celda_opciones = fila.insertCell();
                    celda_opciones.classList.add('opciones');
        
                    
        
        
                    celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                    celda_ubicacion.innerHTML = '';
                    celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                    celda_canton.innerHTML = listaHoteles[i]['canton'];
                    celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                    celda_direccion.innerHTML =  listaHoteles[i]['direccion']; 
                    celda_rating.innerHTML = '';      
                    celda_opciones.innerHTML = '';       
                    
                    
                    let ver_ubicacion = document.createElement('button');
                    ver_ubicacion.textContent = 'Ver ubicación';
        
                    ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
        
                    
                    let longitud = listaHoteles[i]['longitud_mapa'];
                    let latitud = listaHoteles[i]['latitud_mapa'];
        
        
                    ver_ubicacion.onclick = function(){
                        let nombreHotel = listaHoteles[i]['nombre_hotel']
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
        
        
                    let mas_opciones =document.createElement('div');
                        mas_opciones.classList.add('centered');
                        mas_opciones.dataset.id_hotel =  listaHoteles[i]['_id'];
        
        
        
                    let boton_mas_opciones =document.createElement('div');
                        boton_mas_opciones.classList.add('plus');
                        boton_mas_opciones.addEventListener('click', plusToggle);
        
                    let espacio_opciones = document.createElement('div');
                        espacio_opciones.href = '#';
                        espacio_opciones.classList.add('plus__line');
                        espacio_opciones.classList.add('plus__line--v');
        
                    let espacio_2 = document.createElement('div');
                        espacio_2.classList.add('plus__line');
                        espacio_2.classList.add('plus__line--h');
        
                //se crean opciones para modificar, habilitar o deshabilitar y eliminar
                    let boton_editar = document.createElement('a');
                        // editar.href = 'modificar_usuario.html';
                        boton_editar.setAttribute('title', 'Modificar datos del libro');
                        boton_editar.classList.add('fas');
                        boton_editar.classList.add('fa-pen-square');
                        boton_editar.classList.add('plus__link');
                        boton_editar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                    boton_editar.addEventListener('click', editarDatosModificar);
        
        
        
                        let boton_eliminar = document.createElement('a');
                        // eliminar.href = '#';
                        boton_eliminar.setAttribute('title', 'Eliminar libro');
                        boton_eliminar.classList.add('fas');
                        boton_eliminar.classList.add('fa-trash-alt');
                        boton_eliminar.classList.add('plus__link');
                        boton_eliminar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                        boton_eliminar.addEventListener('click', confirmarEliminar);
        
        
        
        
                        //si el estado del patrocinador es habilitado se va a mostar el boton de deshabilitar
                        if( listaHoteles[i]['estado'] == 'Activado'){
                            let boton_desactivar = document.createElement('a');
        
                            boton_desactivar.classList.add('far');
                            boton_desactivar.classList.add('fa-eye-slash');
                            boton_desactivar.classList.add('plus__link');
                            boton_desactivar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_desactivar);
                            boton_desactivar.setAttribute('title', 'Desactivar hotel');
        
                            boton_desactivar.addEventListener('click', desactivarHotel);
        
                        } 
                        
                //si el estado no es igual a habilitado se va a mostar el boton de habilitar
                        
                        if( listaHoteles[i]['estado'] == 'Desactivado'){z
                            let boton_activar = document.createElement('a');
                            boton_activar.setAttribute('title', 'Activar hotel');
        
                            boton_activar.classList.add('far');
                            boton_activar.classList.add('fa-eye');
                            boton_activar.classList.add('plus__link');
                            boton_activar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_activar);
        
                            boton_activar.addEventListener('click', activarHotel);
                        }
        
                        celda_opciones.appendChild(mas_opciones);
                        mas_opciones.appendChild(boton_mas_opciones);
                        boton_mas_opciones.appendChild(espacio_opciones);
                        espacio_opciones.appendChild(boton_editar);
                        espacio_opciones.appendChild(boton_eliminar);
                        
                        boton_mas_opciones.appendChild(espacio_2);
        
                        let ocultar = document.createElement('a');
                        // boton_ver_mas.href = '';
                        ocultar.classList.add('fas');
                        ocultar.classList.add('fa-minus');
                        ocultar.classList.add('plus__link');
                        ocultar.setAttribute('title', 'Ocultar menú');
                        
        
                        espacio_opciones.appendChild(ocultar);
        
                        //funcion para activar el menu
        
                        function plusToggle() {
                            boton_mas_opciones.classList.toggle('plus--active');
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
        
                    let fila = cuerpo_tabla_hoteles.insertRow();            
                                    
                
                
                    let celda_nombre_hotel = fila.insertCell();                    
                    let celda_ubicacion = fila.insertCell();
                    let celda_provincia = fila.insertCell();
                    let celda_canton = fila.insertCell();
                    let celda_distrito = fila.insertCell();
                    let celda_direccion = fila.insertCell();
                    let celda_rating = fila.insertCell();
    
                    let celda_opciones = fila.insertCell();
                    celda_opciones.classList.add('opciones');
        
                    
        
        
                    celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                    celda_ubicacion.innerHTML = '';
                    celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                    celda_canton.innerHTML = listaHoteles[i]['canton'];
                    celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                    celda_direccion.innerHTML =  listaHoteles[i]['direccion']; 
                    celda_rating.innerHTML = '';      
                    celda_opciones.innerHTML = '';      
                    
                    
                    
                    let ver_ubicacion = document.createElement('button');
                    ver_ubicacion.textContent = 'Ver ubicación';
        
                    ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
        
                    
                    let longitud = listaHoteles[i]['longitud_mapa'];
                    let latitud = listaHoteles[i]['latitud_mapa'];
        
        
                    ver_ubicacion.onclick = function(){
                        let nombreHotel = listaHoteles[i]['nombre_hotel']
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
        
                    let mas_opciones =document.createElement('div');
                        mas_opciones.classList.add('centered');
                        mas_opciones.dataset.id_hotel =  listaHoteles[i]['_id'];
        
        
        
                    let boton_mas_opciones =document.createElement('div');
                        boton_mas_opciones.classList.add('plus');
                        boton_mas_opciones.addEventListener('click', plusToggle);
        
                    let espacio_opciones = document.createElement('div');
                        espacio_opciones.href = '#';
                        espacio_opciones.classList.add('plus__line');
                        espacio_opciones.classList.add('plus__line--v');
        
                    let espacio_2 = document.createElement('div');
                        espacio_2.classList.add('plus__line');
                        espacio_2.classList.add('plus__line--h');
        
                //se crean opciones para modificar, habilitar o deshabilitar y eliminar
                    let boton_editar = document.createElement('a');
                        // editar.href = 'modificar_usuario.html';
                        boton_editar.setAttribute('title', 'Modificar datos del libro');
                        boton_editar.classList.add('fas');
                        boton_editar.classList.add('fa-pen-square');
                        boton_editar.classList.add('plus__link');
                        boton_editar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                    boton_editar.addEventListener('click', editarDatosModificar);
        
        
        
                        let boton_eliminar = document.createElement('a');
                        // eliminar.href = '#';
                        boton_eliminar.setAttribute('title', 'Eliminar libro');
                        boton_eliminar.classList.add('fas');
                        boton_eliminar.classList.add('fa-trash-alt');
                        boton_eliminar.classList.add('plus__link');
                        boton_eliminar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                        boton_eliminar.addEventListener('click', confirmarEliminar);
        
        
        
        
                        //si el estado del patrocinador es habilitado se va a mostar el boton de deshabilitar
                        if( listaHoteles[i]['estado'] == 'Activado'){
                            let boton_desactivar = document.createElement('a');
        
                            boton_desactivar.classList.add('far');
                            boton_desactivar.classList.add('fa-eye-slash');
                            boton_desactivar.classList.add('plus__link');
                            boton_desactivar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_desactivar);
                            boton_desactivar.setAttribute('title', 'Desactivar hotel');
        
                            boton_desactivar.addEventListener('click', desactivarHotel);
        
                        } 
                        
                //si el estado no es igual a habilitado se va a mostar el boton de habilitar
                        
                        if( listaHoteles[i]['estado'] == 'Desactivado'){z
                            let boton_activar = document.createElement('a');
                            boton_activar.setAttribute('title', 'Activar hotel');
        
                            boton_activar.classList.add('far');
                            boton_activar.classList.add('fa-eye');
                            boton_activar.classList.add('plus__link');
                            boton_activar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_activar);
        
                            boton_activar.addEventListener('click', activarHotel);
                        }
        
                        celda_opciones.appendChild(mas_opciones);
                        mas_opciones.appendChild(boton_mas_opciones);
                        boton_mas_opciones.appendChild(espacio_opciones);
                        espacio_opciones.appendChild(boton_editar);
                        espacio_opciones.appendChild(boton_eliminar);
                        
                        boton_mas_opciones.appendChild(espacio_2);
        
                        let ocultar = document.createElement('a');
                        // boton_ver_mas.href = '';
                        ocultar.classList.add('fas');
                        ocultar.classList.add('fa-minus');
                        ocultar.classList.add('plus__link');
                        ocultar.setAttribute('title', 'Ocultar menú');
                        
        
                        espacio_opciones.appendChild(ocultar);
        
                        //funcion para activar el menu
        
                        function plusToggle() {
                            boton_mas_opciones.classList.toggle('plus--active');
                        }
                }
            }
        }
    
        if(filtro_provincia!='--Seleccione una provincia--' && filtro_canton =='--Seleccione un cantón--' && filtro_distrito=='--Seleccione un distrito--' ){
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase())) {
        
                    let fila = cuerpo_tabla_hoteles.insertRow();            
                                    
                
                
                    let celda_nombre_hotel = fila.insertCell();                    
                    let celda_ubicacion = fila.insertCell();
                    let celda_provincia = fila.insertCell();
                    let celda_canton = fila.insertCell();
                    let celda_distrito = fila.insertCell();
                    let celda_direccion = fila.insertCell();
                    let celda_rating = fila.insertCell();
    
                    let celda_opciones = fila.insertCell();
                    celda_opciones.classList.add('opciones');
        
                    
        
        
                    celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                    celda_ubicacion.innerHTML = '';
                    celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                    celda_canton.innerHTML = listaHoteles[i]['canton'];
                    celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                    celda_direccion.innerHTML =  listaHoteles[i]['direccion']; 
                    celda_rating.innerHTML = '';      
                    celda_opciones.innerHTML = '';       
                    
                    
                    let ver_ubicacion = document.createElement('button');
                    ver_ubicacion.textContent = 'Ver ubicación';
        
                    ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
        
                    
                    let longitud = listaHoteles[i]['longitud_mapa'];
                    let latitud = listaHoteles[i]['latitud_mapa'];
        
        
                    ver_ubicacion.onclick = function(){
                        let nombreHotel = listaHoteles[i]['nombre_hotel']
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
        
        
                    let mas_opciones =document.createElement('div');
                        mas_opciones.classList.add('centered');
                        mas_opciones.dataset.id_hotel =  listaHoteles[i]['_id'];
        
        
        
                    let boton_mas_opciones =document.createElement('div');
                        boton_mas_opciones.classList.add('plus');
                        boton_mas_opciones.addEventListener('click', plusToggle);
        
                    let espacio_opciones = document.createElement('div');
                        espacio_opciones.href = '#';
                        espacio_opciones.classList.add('plus__line');
                        espacio_opciones.classList.add('plus__line--v');
        
                    let espacio_2 = document.createElement('div');
                        espacio_2.classList.add('plus__line');
                        espacio_2.classList.add('plus__line--h');
        
                //se crean opciones para modificar, habilitar o deshabilitar y eliminar
                    let boton_editar = document.createElement('a');
                        // editar.href = 'modificar_usuario.html';
                        boton_editar.setAttribute('title', 'Modificar datos del libro');
                        boton_editar.classList.add('fas');
                        boton_editar.classList.add('fa-pen-square');
                        boton_editar.classList.add('plus__link');
                        boton_editar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                    boton_editar.addEventListener('click', editarDatosModificar);
        
        
        
                        let boton_eliminar = document.createElement('a');
                        // eliminar.href = '#';
                        boton_eliminar.setAttribute('title', 'Eliminar libro');
                        boton_eliminar.classList.add('fas');
                        boton_eliminar.classList.add('fa-trash-alt');
                        boton_eliminar.classList.add('plus__link');
                        boton_eliminar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                        boton_eliminar.addEventListener('click', confirmarEliminar);
        
        
        
        
                        //si el estado del patrocinador es habilitado se va a mostar el boton de deshabilitar
                        if( listaHoteles[i]['estado'] == 'Activado'){
                            let boton_desactivar = document.createElement('a');
        
                            boton_desactivar.classList.add('far');
                            boton_desactivar.classList.add('fa-eye-slash');
                            boton_desactivar.classList.add('plus__link');
                            boton_desactivar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_desactivar);
                            boton_desactivar.setAttribute('title', 'Desactivar hotel');
        
                            boton_desactivar.addEventListener('click', desactivarHotel);
        
                        } 
                        
                //si el estado no es igual a habilitado se va a mostar el boton de habilitar
                        
                        if( listaHoteles[i]['estado'] == 'Desactivado'){z
                            let boton_activar = document.createElement('a');
                            boton_activar.setAttribute('title', 'Activar hotel');
        
                            boton_activar.classList.add('far');
                            boton_activar.classList.add('fa-eye');
                            boton_activar.classList.add('plus__link');
                            boton_activar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_activar);
        
                            boton_activar.addEventListener('click', activarHotel);
                        }
        
                        celda_opciones.appendChild(mas_opciones);
                        mas_opciones.appendChild(boton_mas_opciones);
                        boton_mas_opciones.appendChild(espacio_opciones);
                        espacio_opciones.appendChild(boton_editar);
                        espacio_opciones.appendChild(boton_eliminar);
                        
                        boton_mas_opciones.appendChild(espacio_2);
        
                        let ocultar = document.createElement('a');
                        // boton_ver_mas.href = '';
                        ocultar.classList.add('fas');
                        ocultar.classList.add('fa-minus');
                        ocultar.classList.add('plus__link');
                        ocultar.setAttribute('title', 'Ocultar menú');
                        
        
                        espacio_opciones.appendChild(ocultar);
        
                        //funcion para activar el menu
        
                        function plusToggle() {
                            boton_mas_opciones.classList.toggle('plus--active');
                        }
                }
            }
        }
    
        if(filtro_provincia!='--Seleccione una provincia--' && filtro_canton !='--Seleccione un cantón--' && filtro_distrito=='--Seleccione un distrito--'){
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['canton'].includes(filtro_canton) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase()) ){
        
                    let fila = cuerpo_tabla_hoteles.insertRow();            
                                    
                
                    let celda_nombre_hotel = fila.insertCell();                    
                    let celda_ubicacion = fila.insertCell();
                    let celda_provincia = fila.insertCell();
                    let celda_canton = fila.insertCell();
                    let celda_distrito = fila.insertCell();
                    let celda_direccion = fila.insertCell();
                    let celda_rating = fila.insertCell();
    
                    let celda_opciones = fila.insertCell();
                    celda_opciones.classList.add('opciones');
        
                    
        
        
                    celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                    celda_ubicacion.innerHTML = '';
                    celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                    celda_canton.innerHTML = listaHoteles[i]['canton'];
                    celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                    celda_direccion.innerHTML =  listaHoteles[i]['direccion']; 
                    celda_rating.innerHTML = '';      
                    celda_opciones.innerHTML = '';   
                    
                    
                    let ver_ubicacion = document.createElement('button');
                    ver_ubicacion.textContent = 'Ver ubicación';
        
                    ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
        
                    
                    let longitud = listaHoteles[i]['longitud_mapa'];
                    let latitud = listaHoteles[i]['latitud_mapa'];
        
        
                    ver_ubicacion.onclick = function(){
                        let nombreHotel = listaHoteles[i]['nombre_hotel']
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
        
    
                    let mas_opciones =document.createElement('div');
                        mas_opciones.classList.add('centered');
                        mas_opciones.dataset.id_hotel =  listaHoteles[i]['_id'];
        
        
        
                    let boton_mas_opciones =document.createElement('div');
                        boton_mas_opciones.classList.add('plus');
                        boton_mas_opciones.addEventListener('click', plusToggle);
        
                    let espacio_opciones = document.createElement('div');
                        espacio_opciones.href = '#';
                        espacio_opciones.classList.add('plus__line');
                        espacio_opciones.classList.add('plus__line--v');
        
                    let espacio_2 = document.createElement('div');
                        espacio_2.classList.add('plus__line');
                        espacio_2.classList.add('plus__line--h');
        
                //se crean opciones para modificar, habilitar o deshabilitar y eliminar
                    let boton_editar = document.createElement('a');
                        // editar.href = 'modificar_usuario.html';
                        boton_editar.setAttribute('title', 'Modificar datos del libro');
                        boton_editar.classList.add('fas');
                        boton_editar.classList.add('fa-pen-square');
                        boton_editar.classList.add('plus__link');
                        boton_editar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                    boton_editar.addEventListener('click', editarDatosModificar);
        
        
        
                        let boton_eliminar = document.createElement('a');
                        // eliminar.href = '#';
                        boton_eliminar.setAttribute('title', 'Eliminar libro');
                        boton_eliminar.classList.add('fas');
                        boton_eliminar.classList.add('fa-trash-alt');
                        boton_eliminar.classList.add('plus__link');
                        boton_eliminar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                        boton_eliminar.addEventListener('click', confirmarEliminar);
        
        
        
        
                        //si el estado del patrocinador es habilitado se va a mostar el boton de deshabilitar
                        if( listaHoteles[i]['estado'] == 'Activado'){
                            let boton_desactivar = document.createElement('a');
        
                            boton_desactivar.classList.add('far');
                            boton_desactivar.classList.add('fa-eye-slash');
                            boton_desactivar.classList.add('plus__link');
                            boton_desactivar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_desactivar);
                            boton_desactivar.setAttribute('title', 'Desactivar hotel');
        
                            boton_desactivar.addEventListener('click', desactivarHotel);
        
                        } 
                        
                //si el estado no es igual a habilitado se va a mostar el boton de habilitar
                        
                        if( listaHoteles[i]['estado'] == 'Desactivado'){z
                            let boton_activar = document.createElement('a');
                            boton_activar.setAttribute('title', 'Activar hotel');
        
                            boton_activar.classList.add('far');
                            boton_activar.classList.add('fa-eye');
                            boton_activar.classList.add('plus__link');
                            boton_activar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_activar);
        
                            boton_activar.addEventListener('click', activarHotel);
                        }
        
                        celda_opciones.appendChild(mas_opciones);
                        mas_opciones.appendChild(boton_mas_opciones);
                        boton_mas_opciones.appendChild(espacio_opciones);
                        espacio_opciones.appendChild(boton_editar);
                        espacio_opciones.appendChild(boton_eliminar);
                        
                        boton_mas_opciones.appendChild(espacio_2);
        
                        let ocultar = document.createElement('a');
                        // boton_ver_mas.href = '';
                        ocultar.classList.add('fas');
                        ocultar.classList.add('fa-minus');
                        ocultar.classList.add('plus__link');
                        ocultar.setAttribute('title', 'Ocultar menú');
                        
        
                        espacio_opciones.appendChild(ocultar);
        
                        //funcion para activar el menu
        
                        function plusToggle() {
                            boton_mas_opciones.classList.toggle('plus--active');
                        }
                }
            }
        }
    
        if(filtro_canton!='--Seleccione un cantón--' && filtro_provincia!='--Seleccione una provincia--' && filtro_distrito!='--Seleccione un distrito--' ){
            for(let i = 0; i < listaHoteles.length; i++) {
                if(listaHoteles[i]['provincia'].includes(filtro_provincia) && listaHoteles[i]['canton'].includes(filtro_canton) && listaHoteles[i]['distrito'].includes(filtro_distrito) && listaHoteles[i]['nombre_hotel'].toLowerCase().includes(filtro_hotel.toLowerCase())){
        
                    let fila = cuerpo_tabla_hoteles.insertRow();            
                                    
                
                
                    let celda_nombre_hotel = fila.insertCell();                    
                    let celda_ubicacion = fila.insertCell();
                    let celda_provincia = fila.insertCell();
                    let celda_canton = fila.insertCell();
                    let celda_distrito = fila.insertCell();
                    let celda_direccion = fila.insertCell();
                    let celda_rating = fila.insertCell();
    
                    let celda_opciones = fila.insertCell();
                    celda_opciones.classList.add('opciones');
        
                    
        
        
                    celda_nombre_hotel.innerHTML =  listaHoteles[i]['nombre_hotel']; 
                    celda_ubicacion.innerHTML = '';
                    celda_provincia.innerHTML =  listaHoteles[i]['provincia'];        
                    celda_canton.innerHTML = listaHoteles[i]['canton'];
                    celda_distrito.innerHTML =  listaHoteles[i]['distrito'];        
                    celda_direccion.innerHTML =  listaHoteles[i]['direccion']; 
                    celda_rating.innerHTML = '';      
                    celda_opciones.innerHTML = '';       
                    
                    
                    let ver_ubicacion = document.createElement('button');
                    ver_ubicacion.textContent = 'Ver ubicación';
        
                    ver_ubicacion.setAttribute('title', "Ver ubicación en el mapa");
        
                    
                    let longitud = listaHoteles[i]['longitud_mapa'];
                    let latitud = listaHoteles[i]['latitud_mapa'];
        
        
                    ver_ubicacion.onclick = function(){
                        let nombreHotel = listaHoteles[i]['nombre_hotel']
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
        
        
                    let mas_opciones =document.createElement('div');
                        mas_opciones.classList.add('centered');
                        mas_opciones.dataset.id_hotel =  listaHoteles[i]['_id'];
        
        
        
                    let boton_mas_opciones =document.createElement('div');
                        boton_mas_opciones.classList.add('plus');
                        boton_mas_opciones.addEventListener('click', plusToggle);
        
                    let espacio_opciones = document.createElement('div');
                        espacio_opciones.href = '#';
                        espacio_opciones.classList.add('plus__line');
                        espacio_opciones.classList.add('plus__line--v');
        
                    let espacio_2 = document.createElement('div');
                        espacio_2.classList.add('plus__line');
                        espacio_2.classList.add('plus__line--h');
        
                //se crean opciones para modificar, habilitar o deshabilitar y eliminar
                    let boton_editar = document.createElement('a');
                        // editar.href = 'modificar_usuario.html';
                        boton_editar.setAttribute('title', 'Modificar datos del libro');
                        boton_editar.classList.add('fas');
                        boton_editar.classList.add('fa-pen-square');
                        boton_editar.classList.add('plus__link');
                        boton_editar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                    boton_editar.addEventListener('click', editarDatosModificar);
        
        
        
                        let boton_eliminar = document.createElement('a');
                        // eliminar.href = '#';
                        boton_eliminar.setAttribute('title', 'Eliminar libro');
                        boton_eliminar.classList.add('fas');
                        boton_eliminar.classList.add('fa-trash-alt');
                        boton_eliminar.classList.add('plus__link');
                        boton_eliminar.dataset.id_hotel =  listaHoteles[i]['_id'];
        
                        boton_eliminar.addEventListener('click', confirmarEliminar);
        
        
        
        
                        //si el estado del patrocinador es habilitado se va a mostar el boton de deshabilitar
                        if( listaHoteles[i]['estado'] == 'Activado'){
                            let boton_desactivar = document.createElement('a');
        
                            boton_desactivar.classList.add('far');
                            boton_desactivar.classList.add('fa-eye-slash');
                            boton_desactivar.classList.add('plus__link');
                            boton_desactivar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_desactivar);
                            boton_desactivar.setAttribute('title', 'Desactivar hotel');
        
                            boton_desactivar.addEventListener('click', desactivarHotel);
        
                        } 
                        
                //si el estado no es igual a habilitado se va a mostar el boton de habilitar
                        
                        if( listaHoteles[i]['estado'] == 'Desactivado'){z
                            let boton_activar = document.createElement('a');
                            boton_activar.setAttribute('title', 'Activar hotel');
        
                            boton_activar.classList.add('far');
                            boton_activar.classList.add('fa-eye');
                            boton_activar.classList.add('plus__link');
                            boton_activar.dataset.id_hotel =  listaHoteles[i]['_id'];
                            espacio_opciones.appendChild(boton_activar);
        
                            boton_activar.addEventListener('click', activarHotel);
                        }
        
                        celda_opciones.appendChild(mas_opciones);
                        mas_opciones.appendChild(boton_mas_opciones);
                        boton_mas_opciones.appendChild(espacio_opciones);
                        espacio_opciones.appendChild(boton_editar);
                        espacio_opciones.appendChild(boton_eliminar);
                        
                        boton_mas_opciones.appendChild(espacio_2);
        
                        let ocultar = document.createElement('a');
                        // boton_ver_mas.href = '';
                        ocultar.classList.add('fas');
                        ocultar.classList.add('fa-minus');
                        ocultar.classList.add('plus__link');
                        ocultar.setAttribute('title', 'Ocultar menú');
                        
        
                        espacio_opciones.appendChild(ocultar);
        
                        //funcion para activar el menu
        
                        function plusToggle() {
                            boton_mas_opciones.classList.toggle('plus--active');
                        }
                }
            }
        }
    
    
    }

    if( filtroRanking == '--Seleccione un tipo de ranking--' ){
        mostrarlistaHoteles();
    }
}

function confirmarEliminar() {
    let id_hotel = this.dataset.id_hotel;
    //se muestra un mensaje para que el usuario confirme o no la accion
    swal({
        title: '¿Está seguro?',
        text: "Este hotel se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Eliminar!'
      }).then((result) => {
          //si el resultado es true se ejecuta la funcion eliminar_patrocinador y se caga la lista sin el patrocinador eliminado
        if (result.value) {
            eliminar_hotel(id_hotel);
            listaHoteles = obtenerHoteles();
            mostrarlistaHoteles();
          swal(
            '¡Eliminado!',
            'El hotel se ha eliminado con éxito',
            'success'
          )
        }
    });
};


function activarHotel() {
    let id_hotel =  this.dataset.id_hotel;
    swal({
        title: '¿Desea activar el hotel?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, estoy seguro!'
      }).then((result) => {
        if (result.value) {
            activar_hotel(id_hotel);
            listaHoteles = obtenerHoteles();
            mostrarlistaHoteles();
          swal(
            'Hotel activado',
            'El hotel volvió a estar activado',
            'success'
          )
        }
      }).then( function() {
        location.reload();
    });
};

function desactivarHotel() {
    let id_hotel =  this.dataset.id_hotel;
    swal({
        title: '¿Desea desactivar el hotel?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, estoy seguro!'
      }).then((result) => {
        if (result.value) {
            desactivar_hotel(id_hotel);
            listaHoteles = obtenerHoteles();
            mostrarlistaHoteles();
          swal(
            'Hotel desactivado!',
            'El hotel ahora se encuentra en estado desactivado',
            'success'
          )
        }
      }).then( function() {
        location.reload();
    });
};

function editarDatosModificar() {
    let id_hotel =  this.dataset.id_hotel;
    localStorage.setItem('hotel', id_hotel );
    window.location.href = 'modificar_hoteles.html';
}