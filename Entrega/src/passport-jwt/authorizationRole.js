const authorization = (role) => {
    return async (req, res, next) => {
        console.log('req.user.role', req.user.user.role)
        console.log('role', role)
        if(!req.user) return res.status(401).send({status: 'error', error: 'Unauthorized'})
        if(req.user.user.role !== role) return res.status(403).send({status: 'error', error: 'Unauthorized'})
        next()
    }
}

module.exports = { authorization }