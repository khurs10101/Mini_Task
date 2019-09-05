//Using Sequelize ORM to do the database work

const Sequelize= require('sequelize');

//parameters details--> Sequelize(db_name, username, password, optional parameters)
//Create a database mini_task_db
const sequelize= new Sequelize('mini_task_orm','root','9435324293', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports= sequelize;