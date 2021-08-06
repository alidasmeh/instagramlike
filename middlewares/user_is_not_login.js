// use if when user is not login and must be redirected. 

module.exports = (req, res, next)=>{
    if( !req.cookies.userID ){
        res.redirect('/auth/login');
    }else{
        next();
    }
}