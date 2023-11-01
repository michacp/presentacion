const express = require("express");

const AppController = require("../controllers/AppController");

const routes = express.Router();

routes.get("/", AppController.index);
routes.get("/names", AppController.getnames);
routes.get("/startname/:names/:id", AppController.start);
routes.get("/deletename/:delete", AppController.deletenames);
routes.get("/createnames", AppController.createname);
routes.get("/namesall", AppController.getallnames);
routes.post("/store-nombre", AppController.savename);
routes.get("/namesen/:id", AppController.getname);
routes.post("/timesave/:id", AppController.savetime);

module.exports = routes;
