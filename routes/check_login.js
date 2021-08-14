var express = require('express');
function check_login(req, res, next) {
    if(!req.cookies.userID){
        res.redirect("/auth/login");
        return;
    }
    next();
}

module.exports = check_login;