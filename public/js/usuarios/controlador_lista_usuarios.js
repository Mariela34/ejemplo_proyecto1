'user strict';
const inputFiltrarUsuario = document.querySelector('#textFiltroCliente');


let listaUsuarios = listar_usuarios();



mostrarListaUsuarios();
inputFiltrarUsuario.addEventListener('keyup', mostrarListaUsuarios);

function mostrarListaUsuarios() {

    let filtro_usuario = inputFiltrarUsuario.value;

    let cuerpo_tabla_usuarios = document.querySelector('.tb_clientes tbody');

    cuerpo_tabla_usuarios.innerHTML= '';



    for(let i = 0; i < listaUsuarios.length; i++) {


        let tipo_usuario = listaUsuarios[i]['tipo_usuario'];

          
        if(tipo_usuario!="Administrador") {
            if(listaUsuarios[i]['nombre_completo'].toLowerCase().includes(filtro_usuario.toLowerCase())){


            let fila = cuerpo_tabla_usuarios.insertRow();            

            
                let celda_foto = fila.insertCell();
                let celda_nombre_completo = fila.insertCell();
                let celda_cedula = fila.insertCell();
                let celda_correo = fila.insertCell();
                let celda_nacimiento = fila.insertCell();
                let celda_edad = fila.insertCell();

                celda_foto.innerHTML;     


                let foto = document.createElement('img');
                //se le ponen los estilos que va a tener la imagen en la tabla
                //si lo que esta en la lista de patrocinadores en la posicion i ,imagen tiene algo se lo va a agregar a la variable imagen
                if(listaUsuarios[i]['foto_usuario']){
                    foto.src = listaUsuarios[i]['foto_usuario'];
                }else{
                    foto.src = '';
                }

                celda_foto.appendChild(foto);


                celda_nombre_completo.innerHTML = listaUsuarios[i]['nombre_completo']; 
                celda_cedula.innerHTML = listaUsuarios[i]['cedula']; 
                celda_correo.innerHTML = listaUsuarios[i]['correo']; 
                celda_nacimiento.innerHTML = listaUsuarios[i]['fecha_nacimiento']; 
                celda_edad.innerHTML = listaUsuarios[i]['edad']; 
        
                
            
        
                
            }     

        }
        
    }
};


