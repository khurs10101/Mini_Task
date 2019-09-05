const Sequelize= require('sequelize');

const sequelize= require('../databases/db');

const Comment= sequelize.define('comment', {

    //defining fields for table
    post_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    comment_text: {
        type: Sequelize.STRING,
        allowNull:false
    },

    comment_length: {
        type: Sequelize.INTEGER,
        allowNull: true
    } 
});

module.exports= Comment;