module.exports = (req, res) => { 
    //clear the jwt token
    res.cookie('jwtToken', '', {httponly:true});
    res.cookie()
}