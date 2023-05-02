const { connect } = require('mongoose');

let url = 'mongodb+srv://fedemerino:J4TviI4yCVromdLr@backend.lfn4tu6.mongodb.net/ecommerce'

module.exports = {
    connectDB: () => {
        connect(url)
            .then(() => console.log('Connected to DB'))
            .catch(err => console.log(err))
    }
}