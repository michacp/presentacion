const AppController = {};
const nombresmodels = require('../models/NombresModels')

AppController.index = async (req, res) => {
  res.render('welcome');
};
AppController.getnames = async (req, res) => {
  const nombres = await nombresmodels.get()
  res.render('nombreslistar', { nombres });
};

AppController.getname = async (req, res) => {

  const nombre = await nombresmodels.findone(req.params.id)
 // console.log(nombre)
  res.render('nombresend', { nombre });
};
AppController.startgame = async (req, res) => {
  const nombre = await nombresmodels.findone(req.params.id)
  //console.log(nombre)
  await nombresmodels.playgame(nombre)
  res.render('nombresend', { nombre });
};



AppController.getallnames = async (req, res) => {
  const nombres = await nombresmodels.getall()
  res.render('nombrestodos', { nombres });
};
AppController.savetime = async (req, res) => {
  console.log(req.body,req.params.id)
   const nombres = await nombresmodels.savetime(req.params.id,req.body.tiempo)
   if (nombres) {
    const nombres = await nombresmodels.get()
    res.render('nombreslistar', { nombres, alertsus: true, mensaje: 'Hecho', icon: 'success', men: 'Tiempo guardado' });
  } else {
    const nombres = await nombresmodels.get()
    res.render('nombreslistar', { nombres, alertsus: true, mensaje: 'Error', icon: 'error', men: 'tiempo no guardado' });
  }
};

AppController.start = async (req, res) => {
  try {
    await nombresmodels.start(req.params.names)
    const nombres = await nombresmodels.get()
    const nombre = await nombresmodels.findone(req.params.id)
    //console.log(nombre)
    res.render('nombresend', { nombre });
  } catch (error) {

  }

}
AppController.deletenames = async (req, res) => {
  const deletes = await nombresmodels.deletena(req.params.delete)
  if (deletes) {
    const nombres = await nombresmodels.get()
    res.render('nombreslistar', { nombres, alertsus: true, mensaje: 'Hecho', icon: 'success', men: 'Participante eliminado' });
  } else {
    const nombres = await nombresmodels.get()
    res.render('nombreslistar', { nombres, alertsus: true, mensaje: 'Error', icon: 'error', men: 'Participante no eliminado' });
  }
}


AppController.createname = async (req, res) => {

  res.render('crearcliente');
}
AppController.savename = async (req, res) => {

  // console.log(req.body)
  const guardar = await nombresmodels.save(req.body)
  if (guardar) {
    const nombres = await nombresmodels.get()
    res.render('nombreslistar', { nombres, alertsus: true, mensaje: 'Hecho', icon: 'success', men: 'Participante guardado' });
  } else {
    const nombres = await nombresmodels.get()
    res.render('nombreslistar', { nombres, alertsus: true, mensaje: 'Error', icon: 'error', men: 'Participante no guardado' })
  }
}


module.exports = AppController;