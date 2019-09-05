const Comment= require('../models/comments');
const sequelize= require('../databases/db');


exports.scanDB= (req, res, next)=>{

    console.log("scanDB in invoked");
    //testing
    sequelize.query("SELECT * FROM comments")
                .then(([result, metadata])=>{
                    waitAndWatch(result);
                });
}

//scan the log table first
function scanLogTable(){

}

function updateLog(comm_id, comm_length){

}

//wait30 and 1 function
const waitAndWatch= (fakeArray)=>{

    

    p=Promise.resolve();

    for(let i=1; i<fakeArray.length; i++){
    p= p.then(()=>{
        console.log(fakeArray[i-1].comment_text);
        text= fakeArray[i-1].comment_text.trim();
        comm_id= fakeArray[i-1].id.trim();
        text_length= text.length;
        console.log(text_length);
        // write the length to log database
        updateLog();
        console.log("wait 30 sec: ");
        return new Promise((resolve, reject)=>{
            setTimeout(resolve,1000);
        });
    }).then((resolve)=>{
       
        if(i%4===0){
        console.log("wait 1 min: ");
        return new Promise((resolve, reject)=>{
            setTimeout(resolve,2000)
        });
        return;
    }
        
    });

}
}



//scan the database and do the task