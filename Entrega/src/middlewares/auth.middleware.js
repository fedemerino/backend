function auth(req,res,next){
    if(req.session.user  == 'admin'){
        next()
    }
    else{
        res.status(401).send('no autorizado')
    }
}

module.exports = auth