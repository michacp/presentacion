const express = require( 'express')
const morgan = require('morgan')
const path = require('node:path');
const{urlencoded,json}=require('express');
const ehbs=require('express-handlebars')
var SerialPort = require("serialport");

const app = express()
//app.use(cors());
app.use(morgan('dev'));


app.use(urlencoded({extended:true}));
app.use(json());
/**
 * Rutas
 **/
app.use(require('./routes'))
/**
 * Motor de plantillas
 **/
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',ehbs.engine({
    defaultLayout:'app',
    extname:'.hbs',
    helpers:require('../src/helpers/handlebars')
}));
app.set('view engine','.hbs')





/**
 * RUTAS PUBLICAS 
 **/
//app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'public')))
/**
 * EJECUTAR SERVIDOR
 **/
 app.listen(3001,()=>{
     console.log('server up in http://localhost:3001');
     
});


