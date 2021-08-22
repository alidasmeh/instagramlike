// login check

module.exports = (req, res, next)=>{
    if( req.cookies.userID ){
        res.redirect('/feed');
    }else{
        next();
    }
}