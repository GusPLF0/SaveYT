const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database.js");
const Tit = require('./links/Links');
const Links = require('./links/LinksController');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita");
    })
    .catch((error)=>{
        console.log(error);
    })

//ROTAS
app.get("/",(req,res)=>{
    Tit.findAll({raw: true, order:[
        ['ipc','DESC']
    ]}).then(dados=>{
        res.render("index",{
            dados:dados
        });
    });
});

app.use('/',Links);


//FIM DAS ROTAS

app.listen(8080,()=>{console.log("App rodando!")})