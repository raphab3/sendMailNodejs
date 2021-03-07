"use strict";

require("reflect-metadata");

var _typeorm = require("typeorm");

(0, _typeorm.createConnection)().then(async connection => {
  console.log("DATABASE CONNECTED SUCCESS!");
  return connection;
}).catch(error => console.log(error));