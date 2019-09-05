const Comment= require('../models/comments');
const sequelize= require('../databases/db');


exports.scanDB= (req, res, next)=>{

    console.log("scanDB in invoked");
    //scan the log table
    scanLogTable()
                .then(([result, metadata])=>{
                    curr_comm_id= result.comm_id;
                })
}

//scan the log table first
function scanLogTable(){
    return sequelize.query('SELECT * FROM logs ORDER BY updatedAt DESC LIMIT 1');
}

function updateLog(comm_id){
    sequelize.query('INSERT INTO logs (comm_id) VALUES ('+comm_id+')')
                .then(([result, metadata])=>{

                })
                .catch();
}

function updateCommentsLength(comm_id, comm_length){
    sequelize.query('UPDATE comments SET comment_length = '+comm_length+' WHERE id = '+comm_id)
                .then(([result, metadata])=>{

                })
                .catch();
}

//wait30 and 1 function
const waitAndWatch= (fakeArray)=>{

    

    p=Promise.resolve();

    for(let i=1; i<fakeArray.length; i++){
    p= p.then(()=>{
        console.log(fakeArray[i-1].comment_text);
        text= fakeArray[i-1].comment_text.trim();
        comm_id= fakeArray[i-1].id.trim();
        comm_length= text.length;
        console.log(comm_length);
        // update comment table with length
        updateCommentsLength(comm_id, comm_length);
        // write the length to log database
        
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