import "reflect-metadata";
import { createConnection, Connection } from 'typeorm'



createConnection().then(async connection => {
    console.log("DATABASE CONNECTED SUCCESS!");
    return connection;

}).catch(error => console.log(error));






