'use strict';

// LIBRAIRIES
var moment = require('moment');

function excelDateToJSDate(excelSerialDate) {
    const daysBeforeUnixEpoch = 70 * 365 + 19;
    const hour = 60 * 60 * 1000;
    return new Date(Math.round((excelSerialDate - daysBeforeUnixEpoch) * 24 * hour) + 12 * hour);
}

function toHour(heureTexte) {
    return moment(heureTexte, "hh:mm").toDate();
}

exports.dateUtils = {
    excelDateToJSDate: excelDateToJSDate,
    toHour: toHour
};
