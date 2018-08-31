'use strict';

function excelDateToJSDate(excelSerialDate) {
    const daysBeforeUnixEpoch = 70 * 365 + 19;
    const hour = 60 * 60 * 1000;
    return new Date(Math.round((excelSerialDate - daysBeforeUnixEpoch) * 24 * hour) + 12 * hour);
}

function getCurrentDate() {
    return new Date();
}

exports.dateUtils = {
    getCurrentDate: getCurrentDate,
    excelDateToJSDate: excelDateToJSDate
};
