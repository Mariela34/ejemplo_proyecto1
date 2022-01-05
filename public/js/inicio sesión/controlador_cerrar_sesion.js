const botonCerrarSesion = document.querySelector('#btnCerrarSesion');

botonCerrarSesion.addEventListener('click', cerrarSesion);


function cerrarSesion() {
    sessionStorage.clear();
    window.location.href='inicio_sesion.html';
};

