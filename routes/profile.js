var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('profile');
});

router.post('/uploadImage', function(req, res, next) {
    // if image uploaded successfully redirect to "get('/'..." again.
    res.render('profile');
});

router.post('/updateinfo', function(req, res, next) {
    // if all data updated successfully back to  "get('/'..." and show an success message.
    res.render('profile');
});

module.exports = router;