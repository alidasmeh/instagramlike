var express = require('express');
var router = express.Router();
var connection = require('../db/connection');

// Here I need the Middleware checkLogin

var userInfo = (req) => {
    // Here I need the userID in the cookie to handle user likes and user profile in the footer
    // var userInfo = connection.query(`SELECT * FROM users WHERE id ='${req.cookies.userID}'`)[0];
    var userInfo = connection.query(`SELECT * FROM users WHERE userid = 4`)[0]; //Test userid:4
    return userInfo
}

/* GET home page. */
router.get('/', function(req, res, next) {

    let posts = connection.query(`SELECT * FROM posts JOIN users ON posts.userid = users.userid`)

    posts.forEach(post => {

        let yourLikeInThisPost = connection.query(`SELECT * FROM likes WHERE postid=${post.postid} AND userid=${userInfo().userid}`)
        if (yourLikeInThisPost.length == 1) {
            post['yourLike'] = "fas fa-heart text-danger";
        } else {
            post['yourLike'] = "far fa-heart text-dark";
        }

        let likes = connection.query(`SELECT * FROM likes WHERE postid=${post.postid}`);
        post['likes'] = likes;

        let comments = connection.query(`SELECT * FROM comments WHERE postid=${post.postid}`);
        post['comments'] = comments;

        let data = new Date(Number(post.date))
        post.date = data.getFullYear() + "/" + data.getMonth() + "/" + data.getDate() + " | " + data.getHours() + ":" + data.getMinutes();

    });

    res.render('feed', {
        userInfo: userInfo(req),
        posts: posts
    });
});

// from here to bottom : Salehi
router.get('/:id', function(req, res, next) {

    let yourLikeInThisPost = connection.query(`SELECT * FROM likes WHERE postid=${req.params.id} AND userid=${userInfo().userid}`)

    if (yourLikeInThisPost.length == 1) {

        connection.query(`DELETE FROM likes WHERE postid=${req.params.id} AND userid=${userInfo().userid}`);

    } else {

        connection.query(`INSERT INTO likes ( postid , userid, date ) VALUES ("${req.params.id}", "${userInfo().userid}", ${new Date().getTime()})`)

    }
    res.redirect('/feed');
});

router.get('/single/:id', function(req, res, next) {
    var result = connection.query(`SELECT * FROM posts WHERE postid='${req.params.id}'`);
    if (result.length == 0) {
        res.send("<h1>Error : Post not found! 404</h1>");
    } else {
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
        color: "",
        onclick: "onclick=like()"
    };
    likes.forEach(like => {
        if (like.userid == Number(req.cookies.userID)) {
            isLiked = {
                color: "style=color:red;",
                onclick: "onclick=err()"
            }
        }
    });
    res.render('post_single', {
        post_info: result,
        likes: likes,
        isLiked: isLiked,
        comments: comments,
        owner_info: owner_info.username
    });
});

router.post('/single/:id', function(req, res, next) {
    var d = new Date();
    var result = connection.query(`INSERT INTO likes (postid, userid, date) VALUES ('${req.params.id}', '${req.cookies.userID}', '${d.getTime()}')`);
    console.log("done");
    res.redirect('back');
});

router.post('/single/comment/:id', function(req, res, next) {
    var d = new Date();
    var result = connection.query(`INSERT INTO comments (postid,userid,text,date) VALUES ('${req.params.id}','${req.cookies.userID}','${req.body.comment}','${d.getTime()}')`);
    console.log(result);
    res.redirect(`../../../feed/single/${req.params.id}`);
});


module.exports = router;