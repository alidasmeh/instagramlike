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
    res.render('post_single');
});


module.exports = router;