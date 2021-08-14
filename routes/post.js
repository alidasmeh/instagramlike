var express = require('express');
var router = express.Router();
var connection = require("./connection");
var check_login = require("./check_login");
var uploadFile = require("express-fileupload");

router.use(uploadFile());
router.use(check_login);

router.get('/new', function(req, res, next) {
    res.render('post_new');
});

router.post('/imageupload', function(req, res, next) {
    // upload the image 
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.send("<h1>ERROR : Please choose a file!</h1>");
    }
    var fileName = new Date().getTime()+req.files.postimage.name.replace(/\s/g, '');
    if (!req.files.postimage.mimetype.includes("image/")){
        return res.send("<h1>ERROR : Please select an image file!</h1>");
    }

    req.files.postimage.mv(`public/images/posts/${fileName}`, function(err){
        if(err){
            return res.send(err);
        }
    });
    res.render('post_new_text', {
        path : `/images/posts/${fileName}`
    });
});

router.post('/post', function(req, res, next) {
    // submit the image, text, ... to the db.
    // redirect to the feed page
    var result = connection.query(`INSERT INTO posts (url, description, userid, date) VALUES ('${req.body.imageurl}', '${req.body.description}', '${req.cookies.userID}', '${new Date().getTime()}')`);
    res.redirect("../../feed");
});


module.exports = router;