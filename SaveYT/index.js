const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection= require('./database/database');
const Tit = require('./database/Titulo');

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita");
    })
    .catch((error)=>{
        console.log(error);
    })


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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

app.get("/salvarlink",(req,res)=>{
    res.render("save");
});

app.post("/savelink",(req,res)=>{
    let title = req.body.title;
    let link = req.body.url;
    let ipc = req.body.ipc;

    if(ipc === 'on'){
        ipc = true;
    }else{
        ipc = false;
    }

    Tit.create({
        titulo:title,
        link:link,
        ipc:ipc
    }).then(()=>{
        res.redirect('/');
    });
});

app.post('/link/delete',(req,res)=>{
    let id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Tit.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/")
            })
        }else{
            res.redirect("/")
        }
    }else{
        res.redirect("/")
    }
})
//FIM DAS ROTAS

app.listen(8080,()=>{console.log("App rodando!")})