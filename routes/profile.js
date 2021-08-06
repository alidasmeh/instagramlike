let express = require('express');
let router = express.Router();
let bcrypt = require("bcrypt");
let connection = require('../db/connection')

const fileUpload = require('express-fileupload');
router.use(fileUpload());
let upload_avatar = require('../middlewares/upload_avatar')

router.use(require('../middlewares/user_is_not_login'));

router.get('/', function(req, res, next) {
    let user = connection.query(`SELECT * FROM users WHERE userid='${req.cookies.userID}' `)[0];
    res.render('profile', {user, errors : ''});
});

router.post('/uploadImage', upload_avatar, function(req, res, next) {
    let user = connection.query(`SELECT * FROM users WHERE userid='${req.cookies.userID}' `)[0];

    if( req.body.avatar.includes("Error") ){
        res.render('profile', {user, errors : req.body.avatar});
        return
    }   
    
    let result = connection.query(`UPDATE users SET avatar='${req.body.avatar}' WHERE userid='${req.cookies.userID}' `);
    if( result ){
        res.redirect('/profile')
    }else{
        res.render('profile', {user, errors : 'there is an error in db.'});
    }

    
});

router.post('/updateinfo', async function(req, res, next) {
    // console.log(req.headers);

    let user = connection.query(`SELECT * FROM users WHERE userid='${req.cookies.userID}' `)[0];
    let result;

    let enc_pass = await bcrypt.hash(req.body.newpassword, 8);
    console.log(enc_pass)

    if( req.body.oldpassword.length != 0 ){
        // user wants to change password
        
        let oldpasswordStatus = await bcrypt.compare(req.body.oldpassword, user.password);
        console.log(oldpasswordStatus);
        if( !oldpasswordStatus ){
            res.send('Old Password is wrong. ');
            return
        }
        if( req.body.newpassword.length < 7 ||  req.body.newpassword != req.body.newpassword2  ){
            res.send('New password is not long enough or are not same.');
            return
        }

        let enc_pass = await bcrypt.hash(req.body.newpassword, 8);
        console.log(enc_pass);
        result = connection.query(`UPDATE users SET username='${req.body.username}', password='${enc_pass}' WHERE userid='${req.cookies.userID}' `);

    }else{
        // user does not want to change password
        result = connection.query(`UPDATE users SET username='${req.body.username}' WHERE userid='${req.cookies.userID}' `);
    }

    if( result ){
        res.redirect('/feed')
    }else{
        res.send("There is an error.");
    }
});

module.exports = router;