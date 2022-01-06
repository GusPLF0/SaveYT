const Sequelize = require('sequelize');

const connection = new Sequelize('saveyt','root','08012004',{
    host: 'localhost',
    dialect:'mysql'
});


module.exports = connection;