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
const port = 3001;
var pedido=[];
cont=0;
app.get("/", function (req, res) {
  res.send("Servidor restaurante");
});

app.post("/recibir", function (req, res) {
  var descripcion = "Se recibio la orden con id: "+ req.body.id
  axios.post('http://localhost:3003/log',{'descripcion':descripcion})
  pedido[cont]=req.body.id
  cont=cont + 1
  res.send("recibido")
});

app.get("/estado/:orden",body_parser, function (req, res) {
  var orden = req.params.orden
  var descripcion = "Se recibio orden: "+ orden +" para conocer su estado"
  axios.post('http://localhost:3003/log',{'descripcion':descripcion})
  var num= Math.floor(Math.random() * (3-1)+1)
  switch (num) {
    case 3:
      var des= "Se ingreso la orden con id: "+orden
      axios.post('http://localhost:3003/log',{'descripcion':des})
      res.send("orden: "+orden+" ingresando");
      break;
    case 2:
      var des= "Orden en preparacion con id: "+orden
      axios.post('http://localhost:3003/log',{'descripcion':des})
      res.send("orden: "+orden+" preparando")
      break;
    case 1:
      var des= "Se cancelo la orden con id: "+orden
      axios.post('http://localhost:3003/log',{'descripcion':des})
      axios.post('http://localhost:3002/recibir',{'orden':orden})
      res.send("orden: "+orden+" cancelada")
      break;
  }
});


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
