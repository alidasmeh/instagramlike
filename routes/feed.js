var express = require('express');
var router = express.Router();
let connection = require("../db/connection")

router.use(require('../middlewares/user_is_not_login'));

router.get('/', function(req, res, next) {
    console.log(req.cookies)

    let posts = connection.query(`SELECT * FROM posts JOIN users ON posts.userid=users.userid  ORDER BY postid DESC LIMIT 20`);

    posts.forEach(post=>{
        let likes = connection.query(`SELECT likeid FROM likes WHERE postid='${post.postid}' `);
        let comments = connection.query(`SELECT commentid FROM comments WHERE postid='${post.postid}' `);
    
        post['likesnumber'] = likes.length;
        post['commentsnumber'] = comments.length;

        let date= new Date(Number(post.date));
        post['date']= date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" - "+date.getHours()+":"+date.getMinutes();

        // this user liked or no
        post['liked'] = false;
        let rows = connection.query(`SELECT likeid FROM likes WHERE postid='${post.postid}' AND userid='${req.cookies.userID}' `);
        if( rows.length>0 ){
            post['liked'] = true;
        }
    })

    // console.log(posts);
    res.render('feed', { posts });
});

router.get('/single/:id', function(req, res, next) {
    let post = connection.query(`SELECT * FROM posts JOIN users ON posts.userid=users.userid WHERE posts.postid='${req.params.id}'`)[0];

    let likes = connection.query(`SELECT likeid FROM likes WHERE postid='${post.postid}' `);
    let comments = connection.query(`SELECT * FROM comments JOIN users ON comments.userid=users.userid  WHERE postid='${post.postid}' `);

    post['likesnumber'] = likes.length;
    post['commentsnumber'] = comments.length; 

    let date= new Date(Number(post.date));
    post['date']= date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" - "+date.getHours()+":"+date.getMinutes();

    comments.forEach(comment=>{
        let date = new Date(Number(comment.date));
        comment['date'] =  date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" - "+date.getHours()+":"+date.getMinutes();
    })

    // this user liked or no
    post['liked'] = false;
    let rows = connection.query(`SELECT likeid FROM likes WHERE postid='${post.postid}' AND userid='${req.cookies.userID}' `);
    if( rows.length>0 ){
        post['liked'] = true;
    }

    // console.log(post);
    res.render('post_single', {post, comments});
});


module.exports = router;