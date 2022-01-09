const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const connection = require("../database/database");
const Tit = require('./Links');

router.get("/salvarlink",(req,res)=>{
    res.render("save");
});

router.post("/savelink",(req,res)=>{
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

router.post('/link/delete',(req,res)=>{
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


module.exports = router;