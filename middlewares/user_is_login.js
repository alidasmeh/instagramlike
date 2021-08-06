// use if when user is logged in and must be redirected. 

module.exports = (req, res, next)=>{
    if( req.cookies.userID ){
        res.redirect('/feed');
    }else{
        next();
    }
}