let express = require('express');
let router = express.Router();
let bcrypt = require("bcrypt"); // use this package to encrypt/hash the password (https://www.npmjs.com/package/bcryptjs) (guidance let enc_pass = await bcrypt.hash('mypass', 8))

router.get('/', function(req, res, next) {
    res.redirect("/auth/signup")
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

module.exports = router;