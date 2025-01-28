const path = require('path')
const express = require('express')
const router = express.Router()
const conn =require("../db_connect.js")
// const con = require('../db_connect.js')

router.post('/', (req, res)=>
{
    console.log("qazwsxedcrfvtgbyh");
    console.log(req.body);
    //TODO: send questions for given list of tags
    var rec="";
    for(i=0;i<req.body.length;i++)
    {
        rec=rec+req.body[i]+" ";
    }
    // console.log(rec)
    rec=rec.trim()
    var tags=rec.split(" ");
    // console.log(tags)
    var str=" (B.tag_name='"+tags[0]+"' ";
    //or B.tag_name='C' //end here
    for(i=1;i<tags.length;i++)
    {
        str=str+"or B.tag_name='"+tags[i]+"' "
    }
    str=str+") )"
    var pre_query="with tag_posts (post_id) as "+
   " ( "+
   "select distinct A.post_id as post_id "+
   "FROM tag_posts as A,tags as B "+
   "WHERE A.tag_id=B.tag_id and ";
    var pos_query="select E.post_id,E.owner_display_name,E.last_editor_display_name,E.last_edit_date,E.up_vote,E.down_vote,E.score,E.acc_ans_count,E.post_title,E.content_license,E.body_text,E.creation_date,E.closed_date"+
    " from posts as E,tag_posts as C "+
    " WHERE E.post_id=C.post_id and post_type_id=1; ";
    console.log(pre_query+str+pos_query);
    conn.query(pre_query+str+pos_query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows)
        res.send(rows)

      })
    //get a string and seperate into arrays and do query on words
})
module.exports = router