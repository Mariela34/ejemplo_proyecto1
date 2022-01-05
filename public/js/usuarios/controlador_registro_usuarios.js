'use strict';
const botonRegistrar = document.querySelector('#botonCrearCuenta');
const inputCedula = document.querySelector('#textCedula');
const inputNombreCompleto = document.querySelector('#textNombreCompleto');
const inputCorreo = document.querySelector('#textCorreo');
const inputFechaNacimiento = document.querySelector('#textFechaNacimiento');
const inputEdad = document.querySelector('#textEdad');
const inputContrasenna = document.querySelector('#textContrasenna');
const inputConfirmacion = document.querySelector('#textConfirmacion');
const fotoUsuario = document.querySelector('#foto');


botonRegistrar.addEventListener('click', obtenerDatosUsuario);
inputFechaNacimiento.addEventListener('change', calcularEdad);


function obtenerDatosUsuario(){

    let fecha_nacimiento = obtenerFechaNacimiento(new Date(inputFechaNacimiento.value));
    let cedula = inputCedula.value;
    let nombre_completo = inputNombreCompleto.value;
    let correo = inputCorreo.value;
    let fechaNacimiento = fecha_nacimiento;
    let edad = Number(inputEdad.value);
    let foto = fotoUsuario.src;
    let contrasenna = inputContrasenna.value;
    let confirmacion = inputConfirmacion.value;

    let inputError=validar(cedula, nombre_completo, correo, fecha_nacimiento, edad, foto, contrasenna, confirmacion, foto);
    if(inputError==false){
        let tipoUsuario = "Cliente";
        let respuesta = registrar_usuario(tipoUsuario, cedula, nombre_completo, correo, fechaNacimiento, edad, foto, contrasenna, foto);

        if(respuesta.success == true) {
            swal({
                type: 'success',
                title: '¡Se ha registrado correctamente!',
                text: 'Ya puede iniciar sesión en la aplicación.',
                timer: 3000,
                showConfirmButton : false
            }).then( function() {
                window.location.href = 'inicio_sesion.html';
            });
        } else {
            swal({
                type: 'warning',
                title: 'Registro incorrecto',
                text: 'No pudo completarse su registro. Inténtelo nuevamente.'
            });
        }
    }else{
        swal({
            type: 'warning',
            title: 'Se encontró un error',
            text: 'Se detectó un requerido vacío o hubo un dato ingresado con un formato incorrecto'
        });
    }
};

function validar(pcedula, pnombre_completo, pcorreo, pfecha, pedad, pfoto, pcontrasenna, pconfirmacion){
    let error = false;
    let expNombreCompleto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜäëïöÄËÏÖ ]+$/;
    let expCorreo= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let expEdad = /^[0-9]{1,3}$/;
    let expContrasenna =/^[0-9a-zA-Z]{8,16}$/;
    let expCedula = /^[0-9a-zA-Z]+$/;


    if(pcedula == '' || pcedula.length == 0 || expCedula.test(pcedula)==false){
        inputCedula.classList.add('errorInput');
        error=true;
    }else{
        inputCedula.classList.remove('errorInput');
    }

    if(pnombre_completo == '' || pnombre_completo.length == 0 || expNombreCompleto.test(pnombre_completo)==false){
        inputNombreCompleto.classList.add('errorInput');
        error=true;
    }else{
        inputNombreCompleto.classList.remove('errorInput');
    }

    
    if(pcorreo == '' || pcorreo == 0 || expCorreo.test(pcorreo)==false){
        inputCorreo.classList.add('errorInput');
        error=true;
    }else{
        inputCorreo.classList.remove('errorInput');
    }

    if(pfecha > new Date() || pfecha === 'Invalid Date'){
        inputFechaNacimiento.style.border='1px solid red';
        error=true;
    }else{
        inputFechaNacimiento.style.border='1px solid black';
    }

    if(pedad == '' || pedad < inputEdad.min || pedad > inputEdad.max || expEdad.test(pedad) == false){
        inputEdad.classList.add('errorInput');
        error = true;
    }else{
        inputEdad.classList.remove('errorInput');
    }

    
    if(pcontrasenna=='' || pcontrasenna == 0 || expContrasenna.test(pcontrasenna)==false){
        inputContrasenna.classList.add('errorInput');
        error=true;       
    }else{
        inputContrasenna.classList.remove('errorInput');
    }
    

    if(pcontrasenna != pconfirmacion || pconfirmacion == ''){
        inputConfirmacion.classList.add('errorInput'); 
        inputContrasenna.classList.add('errorInput');
        error=true;
    }else{
        inputConfirmacion.classList.remove('errorInput');
        inputContrasenna.classList.remove('errorInput');
    }

    if(pfoto == 'http://localhost:3000/public/imgs/img_avatar.png') {
        fotoUsuario.classList.add('errorInput');
        error = true;
    } else {
        fotoUsuario.classList.remove('errorInput');
    }


    return error;
 };


 function calcularEdad(){
    let fechaActual = new Date();
    let fechaNacimiento = new Date(inputFechaNacimiento.value);

    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    let mes = fechaActual.getUTCMonth() - fechaNacimiento.getUTCMonth();

    if (mes < 0 || (mes == 0 && fechaActual.getUTCDate() < fechaNacimiento.getUTCDate())) {
        edad--;
    }

    inputEdad.value = edad;
};

function obtenerFechaNacimiento(pfecha) {
    let anno = pfecha.getFullYear();
    let mes = pfecha.getUTCMonth() + 1;
    let dia = pfecha.getUTCDate();

    pfecha =  dia + "-" + mes + "-" + anno;

    return pfecha;
}


 
 