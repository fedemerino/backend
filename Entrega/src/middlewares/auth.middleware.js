function auth(req,res,next){
    if(req.session?.user?.username  == 'fede' || req.session?.user?.role == 'user'){
        next()
    }
    else{
        res.status(401).send('Unauthorized')
    }
}

module.exports = auth