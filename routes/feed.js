var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    console.log(req.cookies);
    res.render('feed');
});

router.get('/single/:id', function(req, res, next) {
    res.render('post_single');
});


module.exports = router;