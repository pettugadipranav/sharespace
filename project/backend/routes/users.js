const { query } = require('express');
const express = require('express')
const router = express.Router()
const con =require("../db_connect.js")


router.post('/', (req, res) => {
  console.log(req.body.userid,req.body.password);
  var value=[req.body.userid,req.body.password];

  con.query("select password from users where userid=12; ", function (err, result) {
   
  });
  var sql = "INSERT INTO users (userid,password) VALUES (?)";
  con.query(sql,[value], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
})

router.get('/', (req, res) => {
  // var color="";
  var result=[]
  var result1=[]
  // con.query("SELECT U.userid FROM users as U;", function (err, result, fields) {
  //   if (err) throw err;
  //   con.query("select B.password from users as B;",function(err1,result1,fields1)
  //   {
  //     res.send([...result,...result1]);
      
  //   })
   
  // });
  con.query("select userid,password from users;",function(err,result,fields){
    res.send(result);
  })
})



module.exports = router



// var sql1 = "select p.owner_display_name,p.last_editor_display_name,p.last_edit_date,p.up_vote,p.down_vote,p.score,p.views,p.acc_ans_count,p.comment_count,p.post_title,p.body_text,p.creation_date,p.closed_date,c.display_name c.comment_text from posts as p, comments as c where p.post_id=(?) and c.post_id=p.post_id; select p.owner_display_name,p.last_editor_display_name,p.last_edit_date,p.is_accepted_answer,p.up_vote,p.down_vote,p.score,p.views,p.acc_ans_count,p.comment_count,p.post_title,p.body_text,p.creation_date,p.closed_date,c.display_name c.comment_text from posts as p, comments as c where p.parent_id=(?) and c.post_id=p.post_id;";


// var sql2 = "select p.owner_display_name,p.last_editor_display_name,p.last_edit_date,p.up_vote,p.down_vote,p.score,p.views,p.acc_ans_count,p.comment_count,p.post_title,p.body_text,p.creation_date,p.closed_date,c.display_name, c.comment_text from posts as p, comments as c where p.post_id=(?) and c.post_id=p.post_id; select p.owner_display_name,p.last_editor_display_name,p.last_edit_date,p.is_accepted_answer,p.up_vote,p.down_vote,p.score,p.views,p.acc_ans_count,p.comment_count,p.post_title,p.body_text,p.creation_date,p.closed_date,c.display_name c.comment_text from posts as p, comments as c where p.post_id=(?) and c.post_id=p.post_id;"