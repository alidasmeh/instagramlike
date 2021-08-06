let express = require('express');
let router = express.Router();
let bcrypt = require("bcrypt"); // use this package to encrypt/hash the password (https://www.npmjs.com/package/bcryptjs) (guidance let enc_pass = await bcrypt.hash('mypass', 8))
let email_validator = require("email-validator");
let connection = require("../db/connection")

const fileUpload = require('express-fileupload');
router.use(fileUpload());
let upload_avatar = require('../middlewares/upload_avatar')


router.use(require('../middlewares/user_is_login'));

router.get('/', function(req, res, next) {
    res.redirect("/auth/signup")
});

router.get('/signup', function(req, res, next) {
    res.render('signup', {
        errors: [],
        data: {
            username: '',
            email: '',
        }
    });
});

function is_email_new(email) {
    let rows = connection.query(`SELECT * FROM users WHERE email='${email}'`);
    if (rows.length != 0) {
        return false;
    }
    return true;
}

function is_username_new(username) {
    let rows = connection.query(`SELECT * FROM users WHERE username='${username}'`);
    if (rows.length != 0) {
        return false;
    }
    return true;
}

router.post(`/signup`, upload_avatar, async(req, res, next) => {

    console.log(req.body)

    let errors = [];
    if (req.body.username.length < 5) errors.push(`username is too short.`)
    if (!is_username_new(req.body.username)) errors.push(`Username is used before.`);
    if (!email_validator.validate(req.body.email)) errors.push(`Email is not valid.`);
    if (!is_email_new(req.body.email)) errors.push(`Email is submitted before.`);
    if (req.body.avatar.includes("Error")) errors.push(req.body.avatar)
    if (req.body.gender == 0) errors.push(`Choose the gender field.`);
    if (req.body.password != req.body.password2) errors.push(`Passwords are not same.`);
    if (req.body.password.length < 7) errors.push(`Password is not long enough.`);

    if (errors.length != 0) {
        res.render('signup', {
            errors,
            data: {
                username: req.body.username,
                email: req.body.email,
            }
        });
        return
    }

    let enc_pass = await bcrypt.hash(req.body.password, 8);
    let result = connection.query(`INSERT INTO users(email, password, username, avatar, gender, registrationAt) VALUES ('${req.body.email}', '${enc_pass}', '${req.body.username}', '${req.body.avatar}', '${req.body.gender}', '${new Date().getTime()}' )`)

    if (result) {
        res.redirect(`/auth/login`);

    } else {
        res.render('signup', {
            errors: ['There is an error to submit your valid data.'],
            data: {
                username: req.body.username,
                email: req.body.email,
            }
        });
    }

})

router.get('/login', function(req, res, next) {
    res.render('login', { errors: '' });
});

router.post('/login', async(req, res, next) => {
    let query = `SELECT * FROM users WHERE email='${req.body.username}' OR username='${req.body.username}' `;
    let rows = connection.query(query);

    if (rows.length == 1) {
        //                                          current password , saved password
        let passwordStatus = await bcrypt.compare(req.body.password, rows[0].password);

        console.log("password is : " + passwordStatus)
        if (passwordStatus) {
            res.cookie('userID', rows[0].userid)

            res.redirect('/feed');
        } else {
            res.render('login', { errors: 'Password is wrong.' });

        }

    } else {
        res.render('login', { errors: 'Email or username not found.' });
    }
})

module.exports = router;