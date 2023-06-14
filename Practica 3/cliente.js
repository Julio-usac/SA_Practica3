const express = require("express");
const app = express();
const cors = require("cors");
const axios = require('axios');
var body_parser = require ('body-parser').json();

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "5mb", extended: true }));
const port = 3000;

app.get("/", function (req, res) {
  res.send("Servidor cliente");
});

app.get("/ordenar", function (req, res) {
  var num= Math.floor(Math.random() * (1000-1)+1)
  var descripcion = "Se solicito la orden con id: "+num
  axios.post('http://localhost:3005/log',{'descripcion':descripcion})
  axios.post('http://localhost:3005/cliente/ordenar',{'id':num})
  res.json({'id':num})
});

app.get("/estado/:orden",body_parser, function (req, res) {
  var orden = req.params.orden
  var descripcion = "Se solicito estado de la orden: "+orden
  axios.post('http://localhost:3005/log',{'descripcion':descripcion})
  axios.get('http://localhost:3005/orden/estado/'+ orden).then(function(response){
    res.json(response['data'])
  }).catch(function(error){
    console.log(error)
  });
});

app.get("/livestado/:orden",body_parser, function (req, res) {
  var orden = req.params.orden
  var descripcion = "Se solicito estado de envio de la orden: "+orden
  axios.post('http://localhost:3005/log',{'descripcion':descripcion})
  axios.get('http://localhost:3005/delivery/estado/'+orden).then(function(response){
    res.json(response['data'])
  }).catch(function(error){
    console.log(error)
  }).then(function(){

  });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
