const express = require("express");
const app = express();
const cors = require("cors");
const moment = require('moment');
require('moment-timezone');
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "5mb", extended: true }));
const port = 3003;

app.get("/", function (req, res) {
  res.json("Log");
});

app.post("/log", function (req, res) {
  var des = req.body.descripcion
  moment.tz.setDefault('America/Guatemala');
  const fecha = moment().format('YYYY-MM-DD HH:mm:ss');
  des = "log:"+ des +" "+ fecha +" " +"(Hora estandar central)\n"
  fs.appendFile('server.log', des, (error) => {
    if (error) {
      console.error('Error al crear el archivo:', error);
    } else {
      console.log('Contenido agregado correctamente al archivo.');
    }
  });
  res.json("listo")
});

let server = app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

module.exports  = server;