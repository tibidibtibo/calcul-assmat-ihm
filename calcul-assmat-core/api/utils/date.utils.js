'use strict';

// LIBRAIRIES
var moment = require('moment-timezone');

function excelDateToDate(excelSerialDate) {
    if(excelSerialDate) {
        var date = new Date(Math.round((excelSerialDate - (25567 + 2)) * 86400) * 1000);
        return moment(date).tz("Europe/London");
    } else {
        return null;
    }
}

function excelHourToDate(excelSerialHour) {
    var decimalHour = Math.round(moment.duration(excelSerialHour * 1440 / 60) * 100) / 100;
    var hour = ('0' + Math.floor(decimalHour) % 24).slice(-2);
    var minutes = ((decimalHour % 1)*60 + '0').slice(0, 2);
    return hour + ':' + minutes;
}

function toHour(heureTexte) {
    return moment(heureTexte, "hh:mm").toDate();
}

function toDate( date ) {
    return moment(date).format('LL');
}

exports.dateUtils = {
    excelDateToDate: excelDateToDate,
    excelHourToDate: excelHourToDate,
    toHour: toHour,
    toDate: toDate
};
