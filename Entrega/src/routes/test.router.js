const RouterClass = require('./customRouter')
const { faker } = require('@faker-js/faker')

class TestRouter extends RouterClass {
    init() {
        this.get('/', (req, res) => {
            req.logger.info('Test Logger Info')
            req.logger.warning('Test Logger Warning')
            req.logger.error('Test Logger Error')
            req.logger.debug('Test Logger Debug')
            req.logger.fatal('Test Logger Fatal')
            req.logger.http('Test Logger Http')
            res.send('Test Loggers')
        })
        this.get('/test', (req, res) => {
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