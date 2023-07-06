class CurrentSessionDto{
    constructor(user){
        this.username = user.username;
        this.role = user.role;
    }

}

module.exports = { CurrentSessionDto }