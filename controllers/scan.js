const Comment= require('../models/comments');
const sequelize= require('../databases/db');


exports.scanDB= (req, res, next)=>{

    console.log("scanDB in invoked");
    //scan the log table
    scanLogTable()
                .then(([result, metadata])=>{
                    if(result[0].comm_id>0){
                        curr_comm_id= result[0].comm_id;
                    }
                    else{
                        curr_comm_id=1;
                    }
                    //get the number of rows
                    getNoOfRows()
                            .then(([result,metadata])=>{
                                no_of_rows= result[0].COUNT;
                                getAllTableRows(no_of_rows, curr_comm_id)
                                    .then(([result, metadata])=> {

                                        //console.log(result);
                                        waitAndWatch(result);

                                    })
                            })
                })
}

function getAllTableRows(no_of_rows, curr_comm_id){

    curr_row_number= curr_comm_id-1;
    rem_rows= no_of_rows-curr_row_number;
    
    return sequelize.query('SELECT * FROM comments LIMIT '+rem_rows+' OFFSET '+curr_row_number);
}

function getNoOfRows(){
    return sequelize.query('SELECT COUNT(*) AS COUNT FROM comments');
}

//scan the log table first
function scanLogTable(){
    return sequelize.query('SELECT COUNT(*) AS COUNT FROM logs')
            .then(([result, metadata])=>{
                if(result[0].COUNT>0){
                    return sequelize.query('SELECT * FROM logs ORDER BY updatedAt DESC LIMIT 1');
                }else{
                    return sequelize.query('SELECT COUNT(*) AS comm_id FROM logs');
                }
        });
    
}

function updateLog(comm_id){
    sequelize.query('INSERT INTO logs (comm_id) VALUES ('+comm_id+')')
                .then(([result, metadata])=>{

                })
                .catch();
}

function updateCommentsLength(comm_id, comm_length){
    return sequelize.query('UPDATE comments SET comment_length = '+comm_length+' WHERE id = '+comm_id);
}

function updateLogTable(comm_id){
    return sequelize.query('INSERT INTO logs (comm_id, createdAt, updatedAt) VALUES ('+comm_id+', NOW(), NOW())');
}

//wait30 and 1 function
const waitAndWatch= (fakeArray)=>{
    
    p=Promise.resolve();

    for(let i=1; i<fakeArray.length; i++){
    p= p.then(()=>{
        console.log(fakeArray[i-1].comment_text);
        text= fakeArray[i-1].comment_text.trim();
        comm_id= fakeArray[i-1].id;
        comm_length= text.length;
        console.log(comm_length);
        // update comment table with length
        updateCommentsLength(comm_id,comm_length)
            .then(([result, metadata])=>{
                //if success update the log table 
                updateLogTable(comm_id)
                    .catch(err=>{
                        console.log(err);
                    });
            })
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