const Sequelize = require('sequelize');
const connection = require("./database");


const Salve = connection.define('save',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    link:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    ipc:{
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
});

Salve.sync({force:false});

module.exports= Salve;