const botonIniciarSesion=document.querySelector('#botonIniciarSesion');
const inputCorreoInicioSesion=document.querySelector('#correo_inicio_sesion');
const inputContrasennaInicioSesion=document.querySelector('#contrasenna_inicio_sesion');


botonIniciarSesion.addEventListener('click', obtenerDatos);
let id_usuario = sessionStorage.getItem('usuario');


    function obtenerDatos(){
        let correo_inicio_sesion = inputCorreoInicioSesion.value;
        let contrasenna_inicio_sesion = inputContrasennaInicioSesion.value;

        let inputError=validarBlancos(correo_inicio_sesion, contrasenna_inicio_sesion);


        if (inputError == true ){
            swal({
                type: 'warning',
                title: 'Datos incorrectos',
                text: 'Favor inténtelo nuevamente e ingrese los datos correctos.'
            });
        } else {

            let verificacion_exitosa = validarCredenciales(correo_inicio_sesion, contrasenna_inicio_sesion);
                if(verificacion_exitosa.success == true) {

                    ingresar_perfil();
                 

            } else {
                swal({
                    title: 'Datos incorrectos',
                    text: 'El correo electrónico o contraseña son incorrectos. Ingréselos nuevamente',
                    type: 'error',
                    confirmButtonText: 'Entendido'
                });
               
                inputCorreo.classList.add('errorInput');
                inputContrasenia.classList.add('errorInput');
            
            }
        }
    

    };

    function validarBlancos(pcorreo, pcontrasenna){
    let error=false;
    let expCorreo= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(pcorreo == '' || pcorreo == 0 || expCorreo.test(pcorreo)==false){
        inputCorreoInicioSesion.classList.add('errorInput');
        error=true;
    }else{
        inputCorreoInicioSesion.classList.remove('errorInput');
    }

    if(pcontrasenna=='' || pcontrasenna < 8){
        inputContrasennaInicioSesion.classList.add('errorInput');
        error=true;       
    }else{
        inputContrasennaInicioSesion.classList.remove('errorInput');
    }
    return error;
};



function ingresar_perfil() {
    let tipo_usuario = sessionStorage.getItem('tipo_usuario');

    switch(tipo_usuario) {
        case 'Administrador':
            window.location.href = 'listar_hoteles.html'; 
        break;

        case 'Cliente':
            window.location.href = 'listar_hoteles_cliente.html';
        break;

        default:
            swal({
                type: 'warning', 
                title: '¡Ups!',
                text: 'Este usuario no cumple con ningún rol preseleccionado.'
            }).then( function() {
                window.location.href = 'inicio_sesion.html';
            })
        break;
    }
};
