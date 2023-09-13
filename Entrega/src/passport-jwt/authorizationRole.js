const authorization = (role) => {
    return async (req, res, next) => {
        if(!req.user) return res.status(401).send({status: 'error', error: 'Unauthorized'})
        if(req.user.role === 'admin' || req.user.role === 'premium') return next()
        if(req.user.role !== role) return res.status(403).send({status: 'error', error: 'Unauthorized'})
        next()
    }
}

module.exports =  authorization 