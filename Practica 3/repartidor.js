const express = require("express");
const app = express();
const cors = require("cors");
const moment = require('moment');
require('moment-timezone');
const axios = require('axios');
var body_parser = require ('body-parser').json();

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "5mb", extended: true }));
const port = 3002;

app.get("/", function (req, res) {
  res.send("Servidor repartidor");
});

app.post("/recibir", function (req, res) {
  var orden = req.body.orden
  var descripcion = "Repartidor recibio la orden con id: "+orden
  axios.post('http://localhost:3003/log',{'descripcion':descripcion})
  res.send("recibido")
});

app.get("/estado/:orden",body_parser, function (req, res) {
  var orden = req.params.orden
  var descripcion = "Se recibio orden: "+ orden +" para conocer su estado"
  axios.post('http://localhost:3003/log',{'descripcion':descripcion})
  var num= Math.floor(Math.random() * (3-1)+1)
  switch (num) {
    case 1:
      var des= "Orden en camino con id: "+orden
      axios.post('http://localhost:3003/log',{'descripcion':des})
      res.send("orden: "+orden+" en camino")
      break;
    case 2:
      var des= "Orden entregada con id: "+orden
      axios.post('http://localhost:3003/log',{'descripcion':des})
      res.send("orden: "+orden+" entregada")
      break;
  }
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
