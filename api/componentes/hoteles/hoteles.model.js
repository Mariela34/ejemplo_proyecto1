'use strict';
let mongoose = require('mongoose');


let hotelSchema = new mongoose.Schema({
    nombre_hotel  : {type:String, required: true},
    longitud_mapa : {type:String, required: true},
    latitud_mapa : {type:String, required: true},
    provincia  : {type: String, required: true},
    canton  : {type: String, required: true},
    distrito  : {type: String, required: true}, 
    direccion : {type: String, required: true},
    estado : {type: String, required: true},
    promedio_calificaciones: {type: Number},
    calificacion_comida : {type: Number },
    calificacion_calidad_servicio : {type: Number},
    calificacion_habitaciones : {type: Number},
    calificacion_infraestuctura : {type: Number },
    calificacion_limpieza: {type: Number},   
    calificaciones_sumadas: {type: Number },
    total_de_calificiones: {type: Number }
   
})

module.exports = mongoose.model('Hotele', hotelSchema);