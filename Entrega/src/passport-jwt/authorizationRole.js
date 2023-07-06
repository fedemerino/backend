const authorization = (role) => {
    return async (req, res, next) => {
        console.log(req.user.role, 'role')
        if(req.user.role === 'admin') return next()
        if(!req.user) return res.status(401).send({status: 'error', error: 'Unauthorized'})
        if(req.user.role !== role) return res.status(403).send({status: 'error', error: 'Unauthorized'})
        next()
    }
}

module.exports =  authorization 