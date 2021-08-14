var express = require('express');
var router = express.Router();
var check_login = require("./check_login");
var connection = require("./connection");

router.use(check_login);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('feed');
});

router.get('/single/:id', function (req, res, next) {
    var result = connection.query(`SELECT * FROM posts WHERE postid='${req.params.id}'`);
    if (result.length==0){
        res.send("<h1>Error : Post not found! 404</h1>");
    }else {
        result = result[0];
    }
    var owner_info = connection.query(`SELECT username FROM users WHERE userid='${result.userid}'`)[0];
    var likes = connection.query(`SELECT userid FROM likes WHERE postid='${req.params.id}'`);
    var comments = connection.query(`SELECT userid,text,date FROM comments WHERE postid='${req.params.id}'`);
    comments.forEach(comment => {
        var who = connection.query(`SELECT username FROM users WHERE userid='${comment.userid}'`)[0];
        comment.username = who.username;
    });

    var isLiked = {
        color : "",
        onclick : "onclick=like()"
    };
    likes.forEach(like=>{
        if (like.userid==Number(req.cookies.userID)){
            isLiked = {
                color : "style=color:red;",
                onclick : "onclick=err()"
            }
        }
    });
    res.render('post_single', {
        post_info : result,
        likes : likes,
        isLiked : isLiked,
        comments : comments,
        owner_info : owner_info.username
    });
});

router.post('/single/:id', function (req, res, next){
    var d = new Date();
    var result = connection.query(`INSERT INTO likes (postid, userid, date) VALUES ('${req.params.id}', '${req.cookies.userID}', '${d.getTime()}')`);
    console.log("done");
    res.redirect('back');
});

router.post('/single/comment/:id', function (req, res, next) {
    var d = new Date();
    var result = connection.query(`INSERT INTO comments (postid,userid,text,date) VALUES ('${req.params.id}','${req.cookies.userID}','${req.body.comment}','${d.getTime()}')`);
    console.log(result);
    res.redirect(`../../../feed/single/${req.params.id}`);
});


module.exports = router;