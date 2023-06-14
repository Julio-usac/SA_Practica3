const express = require("express");
const app = express();
const cors = require("cors");
const axios = require('axios');
var body_parser = require ('body-parser').json();

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "5mb", extended: true }));
const port = 3005;

app.get("/", function (req, res) {
  res.send("Orquestador");
});

app.get("/ordenar", function (req, res) {
  axios.get('http://localhost:3000/ordenar').then(function(response){
    res.json(response['data'])
  }).catch(function(error){
    console.log(error)
  });
});

app.post("/cliente/ordenar", function (req, res) {
  axios.post('http://localhost:3001/recibir',{'id':req.body.id})
});


app.post("/log", function (req, res) {
  axios.post('http://localhost:3003/log',{'descripcion':req.body.descripcion})
});

app.get("/estado/:orden",body_parser, function (req, res) {
  var orden = req.params.orden
  axios.get('http://localhost:3000/estado/'+ orden).then(function(response){
    res.send(response['data'])
  }).catch(function(error){
    console.log(error)
  });
});

app.get("/orden/estado/:orden",body_parser, function (req, res) {
  var orden = req.params.orden
  axios.get('http://localhost:3001/estado/'+ orden).then(function(response){
    res.json(response['data'])
  }).catch(function(error){
    console.log(error)
  });
});


app.get("/livestado/:orden",body_parser, function (req, res) {
  var orden = req.params.orden
  axios.get('http://localhost:3000/livestado/'+orden).then(function(response){
    res.send(response['data'])
  }).catch(function(error){
    console.log(error)
  }).then(function(){

  });
});

app.get("/delivery/estado/:orden",body_parser, function (req, res) {
  var orden = req.params.orden
  axios.get('http://localhost:3002/estado/'+orden).then(function(response){
    res.json(response['data'])
  }).catch(function(error){
    console.log(error)
  }).then(function(){

  });
});

app.post("/recibir", function (req, res) {
  var orden = req.body.orden
  axios.post('http://localhost:3002/recibir',{'orden':orden})
  res.send("recibido")
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
