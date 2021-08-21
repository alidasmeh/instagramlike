let express = require('express');
let router = express.Router();
var bcrypt = require("bcrypt")
var connection = require("../db/connection")
let upload_avatar = require('../middlewares/upload_avatar')

var fileUpload = require('express-fileupload');
router.use(fileUpload());

var user_is_login = require("../middlewares/user_is_login")
var user_is_not_login = require("../middlewares/user_is_not_login")




function check_data(data){

    let errors = []

    var duplicateـemail = connection.query(`SELECT * FROM users WHERE email = '${data.email}' `)
    var duplicateـusername = connection.query(`SELECT * FROM users WHERE username = '${data.username}' `)

    if( data.username.length <= 4 || data.username.length > 20 ) errors.push("Your username must be between 4 and 20 characters long")
    else if( duplicateـusername.length != 0 ) errors.push("Your username is duplicated")

    if( data.email.length < 12 || data.email.length > 35 ) errors.push("Your email must be between 12 and 35 characters long")
    else if( duplicateـemail.length != 0 ) errors.push("This email has been used before")

    if( data.gender == 0 )  errors.push("Determine the gender")
    if( data.avatar.includes("Error") || data.avatar.length == 0 )  errors.push(data.avatar)

    if( data.password.length < 8 || data.password.length > 20) errors.push("Your password must be between 8 and 20 characters long")
    else if( data.password.search(/[a-z]/i) < 0 ) errors.push("Your password must contain one letter")
    else if( data.password.search(/[0-9]/) < 0 )  errors.push("Your password must contain one number")
    else if ( data.password !== data.password2 ) errors.push("Your passwords are not matched")

    return errors
}



router.get('/', user_is_login, function(req, res, next) {
    res.redirect("/auth/signup")
});


router.get('/signup', user_is_login,  function(req, res, next) {
    let errors = []
    res.render('signup', { errors: errors })
});


router.post('/signup', user_is_login,  upload_avatar, async function(req, res, next){
        // console.log(req.body);
    var check_data_err = await check_data(req.body)

    if( check_data_err.length == 0 ){ // we don't have ERROR

        let enc_password = await bcrypt.hash(req.body.password, 10)
        let d = new Date()

        let query = `INSERT INTO users (email, password, username, avatar, gender, registrationAt) VALUES ('${req.body.email}', '${enc_password}', '${req.body.username}', '${req.body.avatar}', '${req.body.gender}', '${d.getTime()}')`;
        let result = connection.query(query);

        if ( result.affectedRows > 0 ) {

            result = connection.query(`SELECT * FROM users WHERE username = '${req.body.username}'`)[0]
            res.redirect("/auth/login")
        }
    }else{

        res.render('signup', { errors: check_data_err })
    }
})


router.post('/signup/email', user_is_login,  function(req, res, next) {
    var duplicateـemail = connection.query(`SELECT * FROM users WHERE email = '${req.body.email}' `)
    res.send(duplicateـemail)
});


router.post('/signup/username', user_is_login,  function(req, res, next) {
    var duplicateـusername = connection.query(`SELECT * FROM users WHERE username = '${req.body.username}' `)
    res.send(duplicateـusername)
});



router.get('/login', user_is_login,  function(req, res, next) {
    res.render( "login" , {errors : []} )
});


router.post('/login', user_is_login,  async function(req, res, next) {

    let error = []
    let user = connection.query(`SELECT * FROM users WHERE username='${req.body.username}' OR email='${req.body.username}' `);
    if( user.length == 1 ){
        
        let result = await bcrypt.compare(req.body.password, user[0].password);
        if (result) {
            res.cookie("userID", user[0].userid, {expires: new Date(new Date().getTime() + 24 * 3600 * 1000 )})
            res.redirect("/feed")
        } else {
            error.push("password is wrong.")
            res.render( "login" , {errors : error} )
        }
    }else{
        error.push("You have not registered with this account yet")
        res.render( "login" , {errors : error} )
    }

});


router.get('/logout',user_is_not_login , function(req, res, next) {
    res.clearCookie("userID")
    res.redirect("/auth/login")
});


module.exports = router;