const Sequelize= require('sequelize');

const sequelize= require('../databases/db');

const Post= sequelize.define('post', {
    //defining fields for table
    post_text: {
        type: Sequelize.STRING,
        allowNull: false
    },

    published_date: {
        type: Sequelize.DATE,
        allowNull: false
    }

});

module.exports= Post;