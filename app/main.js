'use strict';

var moment = require('moment');
var _ = require('lodash');

var dateUtils = require('./date.utils').dateUtils;
var configuration = require('./configuration').configuration;
var excelReader = require('./excel-reader').excelReader;

const data = excelReader.readExcelFile("../specifications/Suivi garde Louise et Joséphine.xlsx");

console.log(data);



