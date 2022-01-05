'use strict';

const usuarioModel = require('./usuarios.model');
const nodemailer = require('nodemailer');

//Función para hacer los registros

module.exports.registrarUsuario = function(req, res) {
   
    let nuevoUsuario= new usuarioModel({
        tipo_usuario: req.body.tipo_usuario,
        cedula: req.body.cedula,
        nombre_completo: req.body.nombre_completo,
        fecha_nacimiento: req.body.fecha_nacimiento,
        edad: req.body.edad,
        correo: req.body.correo,
        foto_usuario:req.body.foto_usuario,
        contrasenna: req.body.contrasenna,
        
    });

    nuevoUsuario.save(function(error) {
        if(error){
            res.json({success: false, msg: 'No se pudo registrar al usuario, ocurrió el siguiente error: "'+error+'"'});
        }else{
           
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'hoteles.Costa.Rica0@gmail.com', // generated ethereal user
                        pass: 'hoteles2019' // generated ethereal password
                    }
                });

                // setup email data with unicode symbols
            
            
           
                let mailOptions = {
                    from: 'hoteles.Costa.Rica0@gmail.com', // sender address
                    to: `${req.body.correo}`, // list of receivers'
                    subject: 'Hoteles Costa Rica', // Subject line
                    text: 'Su registro en Hoteles Costa Rica se ha completado', // plain text body
                    html: `<h1>Bienvenido(a), ${req.body.nombre_completo}</h3><p>Se ha creado una cuenta en Hoteles Costa Rica.</h3><p>Ahora podra descubrir un poco más sobre Hoteles Costa Rica.</p><p>Estas son sus credencialeses:</p><p>Correo electrónico ${req.body.correo}</p> <p>Contraseña: ${req.body.contrasenna}.</p><p>Para ingresar visite el siguiente enlace<p> 
                    <a href="http://localhost:3000/public/inicio_sesion.html" >Ingresar a Hoteles Costa Rica </a>`
                    
                    
                    
                   
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                });
            });




            res.json({success: true, msg: 'El usuario se registró con éxito'});
        
        }
    });

};



module.exports.buscarUsuario = function(req, res) {
    usuarioModel.findOne({_id: req.body.id}).then(
        function(usuario){
            if(usuario) {
                res.send(usuario);
            } else {
                res.send('Este usuario no se encuentra');
            }
        }
    )
};

module.exports.accederCuenta =function(req, res) {
    usuarioModel.findOne({correo : req.body.correo}).then(
        function(usuario) {
            if(usuario) {
                if(usuario.contrasenna == req.body.contrasenna) {
                    res.json(
                        {
                            success : true, 
                            _id: usuario._id,
                            tipo_usuario: usuario.tipo_usuario,
                            cedula: usuario.cedula,
                            nombre_completo: usuario.nombre_completo,
                            fecha_nacimiento: usuario.fecha_nacimiento,
                            edad: usuario.edad,
                            correo: usuario.correo,
                            foto_usuario: usuario.foto_usuario, 
                            contrasenna : usuario.contrasenna,
                        }
                    );
                }  
            } else {
                res.json({
                    success: false,
                    msg: 'El usuario no existe en nuestros servidores'
                })
            }           
        }
    );
};

module.exports.listaUsuarios = function(req, res) {
    usuarioModel.find().sort({nombre_completo: 'asc'}).then(
        function(usuarios){
            res.send(usuarios);
        }
    )
};