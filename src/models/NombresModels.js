const NombresModels = {};
const fs = require('fs');
var SerialPort = require("serialport");
const { newId } = require("../helpers/objectId");
NombresModels.get = async (iduser) => {


  //     //Creamos un objeto
  //     let objeto = [{
  //         nombre: 'Christian ',
  //         apellido: 'suarez',cedula: '1900489921', telefono: '0983249741', marca_dell: 'M20'
  //     }, {
  //         nombre: 'Byron',
  //         apellido: 'Odoñez',cedula: '01020304554', telefono: '0983249743', marca_dell: 'j8'
  //     }];
  // console.log(JSON.stringify(objeto))
  //     //Guardamos el objeto en un archivo de texto
  //     fs.writeFileSync("test.json",
  //         JSON.stringify(objeto));

  //Leemos el archivo que acabamos de crear
  let Datos = fs.readFileSync("test.json");
  Datos = JSON.parse(Datos);
  const result = Datos.filter((Datos) => Datos.status == 'ACTIVE');

  //console.log(Datos);
  return result
}

NombresModels.getall = async (iduser) => {

  let Datos = fs.readFileSync("test.json");
  Datos = JSON.parse(Datos);

  return Datos
}

NombresModels.findone = async (iduser) => {

  let Datos = fs.readFileSync("test.json");
  Datos = JSON.parse(Datos);
  const result = Datos.filter((Datos) => Datos.id == iduser);
  return result[0]
}

var arduinoCOMPort = '/dev/ttyACM0';

var arduinoSerialPort = new SerialPort(arduinoCOMPort, {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

arduinoSerialPort.on('open', function () {
    console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});



NombresModels.start = async (nombre, apellido) => {
  try {
    const enviar = "%22%" + nombre + "  ";
    arduinoSerialPort.write(enviar.toString('utf-8'));

  } catch (error) {
    console.log(error)
  }

}

NombresModels.playgame = async (nombre) => {
  try {
    console.log(nombre.nombre)
    const enviar = "%33%" + nombre + "  ";
    arduinoSerialPort.write(enviar.toString('utf-8'));

  } catch (error) {
    console.log(error)
  }

}

NombresModels.save = async (datos) => {
  try {
    datos.status = 'ACTIVE'
    datos.id = await newId();
    const da = [];
    da.push(datos)
    let Datos = fs.readFileSync("test.json");
    Datos = JSON.parse(Datos);
    //console.log(Datos)
    datass = da.concat(Datos)
    //Datos.push(datos)
    fs.writeFileSync("test.json",
      JSON.stringify(datass));
    return true
  } catch (error) {
    console.log(error)
    return false
  }

}


NombresModels.deletena = async (iduser) => {
  //console.log(iduser)
  let Datos = fs.readFileSync("test.json");
  Datos = JSON.parse(Datos);

  var doubles = await Datos.map(function (x) {
    if (x.id == iduser) {
      x.status = 'DISABLE'
    }
    return x
  })
  fs.writeFileSync("test.json",
    JSON.stringify(doubles));
  return true
}
NombresModels.savetime = async (iduser, time) => {
  //console.log(iduser)
  let Datos = fs.readFileSync("test.json");
  Datos = JSON.parse(Datos);

  var doubles = await Datos.map(function (x) {
    if (x.id == iduser) {
      x.status = 'DISABLE'
      x.time=time

    }
    return x
  })
  fs.writeFileSync("test.json",
    JSON.stringify(doubles));
  return true
}

module.exports = NombresModels;