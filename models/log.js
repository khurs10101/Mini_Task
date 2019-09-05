const Sequelize= require('sequelize');
const sequelize= require('../databases/db');

const LogTable= sequelize.define('logs',{

    comm_id:{
        type: Sequelize.INTEGER
    }

});

module.exports= LogTable;