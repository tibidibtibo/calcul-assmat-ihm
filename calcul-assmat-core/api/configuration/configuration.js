'use strict';

var mixin = {};

mixin.heureDebutEcole = "08:50";
mixin.heureFinEcole = "16:45";
mixin.hNormalesJosephineSemaine = 35.75;
mixin.hNormalesLouiseSemaine = 3.25;
mixin.indemnitesKm = 0.84;
mixin.salaireBrutHoraire = 3.20;
mixin.salaireNetHoraire =2.90;
mixin.indemnitesEntretien = 2.65;
mixin.fraisDejeuner = 1;
mixin.fraisGouter = 0.5;
mixin.arEcoleKm = 3.6;
mixin.salaireNetMensualise = 302.38 + 27.48;
mixin.tauxCongesPayes = 0.1;
mixin.heuresNormales = {
    "Louise": {
        "1": 65/60,
        "2": 65/60,
        "3": 0,
        "4": 65/60,
        "5": 0
    }, 
    "Joséphine":{
        "1": 9.25,
        "2": 9.25,
        "3": 0,
        "4": 9.25,
        "5": 8
    }
};

exports.configuration = mixin;