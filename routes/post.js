let express = require('express');
let router = express.Router();
let connection = require("../db/connection")

router.use(require('../middlewares/user_is_not_login'));

const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.get('/new', function(req, res, next) {
    res.render('post_new', { error: "" });
});

function upload_image(req, res, next) {
    let postimage;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        req.body.postimage = `Error : No files were uploaded.`;
        return next();
    }

    // The name of the input field (i.e. "postimage") is used to retrieve the uploaded file
    postimage = req.files.postimage;
    uploadPath = __dirname + `/../public/images/posts/${new Date().getTime()}_${postimage.name}`;
    let url = `/images/posts/${new Date().getTime()}_${postimage.name}`;

    console.log(postimage.mimetype)
    if (!postimage.mimetype.includes("image/")) {
        req.body.postimage = `Error : This file is not an image.`;
        return next();
    }

    if (postimage.size > 5000000) {
        req.body.postimage = `Error : This image is larger than 5 Mb.`;
        return next();
    }

    // Use the mv() method to place the file somewhere on your server
    postimage.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        } else {
            req.body.postimage = url;
            next();
        }

    });
}

router.post('/imageupload', upload_image, function(req, res, next) {

    if (req.body.postimage.includes("Error")) {
        res.render('post_new', { error: req.body.postimage });
        return
    }

    res.render('post_new_text', { postimage: req.body.postimage });
});

router.post('/post', function(req, res, next) {
    // submit the image, text, ... to the db.
    // redirect to the feed page

    let result = connection.query(`INSERT INTO posts(url, description, userid, date) VALUES ('${req.body.imageurl}', '${req.body.comment}', '${req.cookies.userID}', '${new Date().getTime()}')`);

    if (result) {
        res.redirect(`/feed`)
    } else {
        res.send("There is an error to post the post.")
    }

});

router.post('/leavecomment', (req, res)=>{
    
    let result = connection.query(`INSERT INTO comments (postid, userid, text, date) VALUES ('${req.body.postid}', '${req.cookies.userID}', '${req.body.comment}', '${new Date().getTime()}')`)

    if( result ){
        res.redirect(`/feed/single/${req.body.postid}`)
    }else{
        res.send("There is an error.")
    }
})

router.get('/like/:postid', (req, res)=>{
    let result = connection.query(`INSERT INTO likes (postid, userid, date) VALUES ('${req.params.postid}', '${req.cookies.userID}', '${new Date().getTime()}')`);

    if( result ){
        res.redirect(`/feed`)
    }else{
        res.send("there is an error.");
    }
})

router.get('/likeFromSignlePost/:postid', (req, res)=>{
    let result = connection.query(`INSERT INTO likes (postid, userid, date) VALUES ('${req.params.postid}', '${req.cookies.userID}', '${new Date().getTime()}')`);

    if( result ){
        res.redirect(`/feed/single/${req.params.postid}`)
    }else{
        res.send("there is an error.");
    }
})



module.exports = router;