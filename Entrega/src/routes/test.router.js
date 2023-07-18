const RouterClass = require('./customRouter')
const {faker } = require('@faker-js/faker')

class TestRouter extends RouterClass {
    init() {
        this.get('/', (req, res) => {
            let user = {
               firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            }
            res.send({
                status: 'success',
                payload: user
            })
        })
    }
}


module.exports = new TestRouter().router