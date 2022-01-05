'use strict';
const hotelModel = require('./hoteles.model');


module.exports.registrarHotel = function(req, res) {
      let nuevoHotel = hotelModel({
        nombre_hotel  : req.body.nombre_hotel,
        longitud_mapa : req.body.longitud_mapa,
        latitud_mapa : req.body.latitud_mapa,
        provincia  : req.body.provincia,
        canton  : req.body.canton,
        distrito  : req.body.distrito, 
        direccion : req.body.direccion,
        estado : "Activado",
        promedio_calificaciones: 0,
        calificacion_comida : 0,
        calificacion_calidad_servicio : 0,
        calificacion_habitaciones : 0,
        calificacion_infraestuctura : 0,
        calificacion_limpieza: 0,   
        calificaciones_sumadas: 0,
        total_de_calificiones: 0
    });

    nuevoHotel.save(function(error) {
        if(error){
            res.json({success: false, msg: 'No se pudo registrar el hotel, ocurrió el siguiente error: "'+error+'"'});
        }else{
            res.json({success: true, msg: 'El hotel se registró con éxito'});
        
        }
    });
};

module.exports.listarHoteles = function(req, res) {
    hotelModel.find().sort({nombre_hotel: 'asc'}).then(
        function(hoteles){
            res.send(hoteles);
        }
    )
};

module.exports.listarRankingMenorMayor = function(req, res) {
    hotelModel.find().sort({promedio_calificaciones: 'asc'}).then(
        function(hoteles){
            res.send(hoteles);
        }
    )
};
module.exports.listarRankingMayorMenor = function(req, res) {
    hotelModel.find().sort({promedio_calificaciones: 'desc'}).then(
        function(hoteles){
            res.send(hoteles);
        }
    )
};


module.exports.buscarHotel = function(req, res) {
    hotelModel.findOne({_id: req.body.id}).then(
        function(hotel){
            if(hotel) {
                res.json({
                    success : true,
                    hotel : hotel,
                    nombre_hotel  : hotel.nombre_hotel,
                    longitud_mapa : hotel.longitud_mapa,
                    latitud_mapa : hotel.latitud_mapa,
                    provincia  : hotel.provincia,
                    canton  : hotel.canton,
                    distrito  : hotel.distrito, 
                    direccion : hotel.direccion,
                    estado : hotel.estado,
                    promedio_calificaciones: hotel.promedio_calificaciones,
                    calificacion_comida : hotel.calificacion_comida,
                    calificacion_calidad_servicio : hotel.calificacion_calidad_servicio,
                    calificacion_habitaciones : hotel.calificacion_habitaciones,
                    calificacion_infraestuctura : hotel.calificacion_infraestuctura,
                    calificacion_limpieza: hotel.calificacion_limpieza,   
                    calificaciones_sumadas: hotel.calificaciones_sumadas,
                    total_de_calificiones: hotel.total_de_calificiones
                });
            } else {
                res.send('Este hotel no se encuentra');
            }
        }
    )
};

module.exports.modificarHotel = function(req, res) {
    hotelModel.findByIdAndUpdate(req.body.id, {$set: req.body}, 
        function(error) {
            if(error) {
                res.json({success: false ,msg: 'No se pudo modificar el hotel',
            
            });
            }else{
                res.json({success: true ,msg: 'El hotel se modificó con éxito'}); 
            }
        }
    )
};

module.exports.eliminarHotel = function(req, res) {
    hotelModel.findByIdAndDelete(req.body.id,
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo eliminar el hotel seleccionado'});
            }else{
                res.json({success: true ,msg: 'El hotel se eliminó con éxito'}); 
            }
        }
    )
};

module.exports.desactivarHotel = function(req, res){
    hotelModel.findByIdAndUpdate(req.body.id, {$set: { 
        estado: 'Desactivado'
      }},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo desactivar el hotel seleccionado'});
            }else{
                res.json({success: true ,msg: 'El hotel se desactivó con éxito'}); 
            }
        }
    )   
};

module.exports.activarHotel = function(req, res){
    hotelModel.findByIdAndUpdate(req.body.id, {$set: { 
        estado: 'Activado'
      }},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo activar el hotel seleccionado'});
            }else{
                res.json({success: true ,msg: 'El hotel volvió al estado activado nuevamente con éxito'}); 
            }
        }
    )   
};

module.exports.calificarHotel = function(req, res){
    hotelModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se realizó la calificación del hotel'});
            }else{
                res.json({success: true ,msg: 'La calificación del hotel se realizó con éxito'}); 
            }
        }
    )
};