const express = require('express');
const app = express();
var mysql =require('mysql');
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "5mb", extended: true }));
const port = 80;

var connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'mysqldb',
  port: 4000
});



app.get('/', function (req, res) {
  
  res.send('Este es el home')
})

app.get('/getUsuario', async function (req, res) {

  var sql="SELECT * FROM user;";
  connection.query(sql,async function(error,result){
    if(error){
      console.log(error);
      res.send('Error al conectar')
    }else{
      console.log(JSON.stringify(result));
      res.json(result);
    }
  });
})

app.post('/postUsuario', async function (req, res) {
  var sql="INSERT INTO user (nombre) values (\""+req.body.nombre+"\");";

  connection.query(sql,async function(error,result){
    if(error){
      console.log("Error al conectar");
      res.send('Error al conectar')
    }else{
      console.log(JSON.stringify(result));
      res.json(result);
    }
  });
})


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});