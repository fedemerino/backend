
const RouterClass = require('./customRouter')
const { getUsers, deleteInactiveUsers, getAllUsers, updateUser } = require('../controllers/users.controller')
class UsersRouter extends RouterClass {
    init() {
        this.get('/', getUsers)
        this.get('/all', getAllUsers)
        this.delete('/inactive', deleteInactiveUsers)
        this.put('/update', updateUser)
    }
}
module.exports = new UsersRouter()