const express= require('express');
const Post= require('./models/posts');
const Comment= require('./models/comments');
const LogTable= require('./models/log');
const app= express();

const queryRoute= require('./routes/query');

//Migration of tables based on models
Post
    .sync()
    .then(result=> {
        console.log(result);
    })
    .catch(err=> {
        console.log(err);
    });

Comment
    .sync()
    .then(result=> {
        console.log(result);
    })
    .catch(err=> {
        console.log(err);
    });

LogTable
    .sync()
    .then(result=>{
        console.log(result)
    })
    .catch(err=>{
        console.log(err);
    });

//registering routes
app.use(queryRoute);

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});

