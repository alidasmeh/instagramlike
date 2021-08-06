var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'InstagramLike' });
    console.log("req.cookies.userID : ", req.cookies.userID)
});

router.get('/logout', (req, res, next)=>{
    res.clearCookie('userID');
    res.redirect('/auth/login')
});

module.exports = router;