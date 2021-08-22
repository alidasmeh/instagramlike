// login check

module.exports = (req, res, next)=>{
    if( !req.cookies.userID ){
        res.redirect('/auth/login');
    }else{
        next();
    }
}