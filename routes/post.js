var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next) {
    res.render('post_new');
});

router.post('/imageupload', function(req, res, next) {
    // upload the image 
    res.render('post_new_text');
});

router.post('/post', function(req, res, next) {
    // submit the image, text, ... to the db.
    // redirect to the feed page
    res.send("OK")
});


module.exports = router;