'use strict';
const express = require('express');
const router = express.Router();
const hotelApi = require('./hoteles.api');

router.route('/registrar_hotel')
    .post(function (req, res) {
        hotelApi.registrarHotel(req, res);
    });

router.route('/listar_hoteles')
    .get(function (req, res) {
        hotelApi.listarHoteles(req, res);
    });

router.route('/obtenerRankingMayorMenor')
    .get(function (req, res) {
        hotelApi.listarRankingMayorMenor(req, res);
    }); 

router.route('/obtenerRankingMenorMayor')
    .get(function (req, res) {
        hotelApi.listarRankingMenorMayor(req, res);
    }); 

router.route('/modificar_hotel')
    .post(function(req, res) {
        hotelApi.modificarHotel(req, res);
    });

router.route('/eliminar_hotel')
    .post(function (req, res) {
        hotelApi.eliminarHotel(req, res);
    });

router.route('/desactivar_hotel')
    .post(function(req, res) {
        hotelApi.desactivarHotel(req, res);
    });

router.route('/activar_hotel')
    .post(function(req, res) {
        hotelApi.activarHotel(req, res);
    });

router.route('/buscar_hotel')
    .post(function(req, res) {
        hotelApi.buscarHotel(req, res);
    })

router.route('/calificar_hotel')
    .post(function(req, res) {
        hotelApi.calificarHotel(req, res);
    })

module.exports = router;