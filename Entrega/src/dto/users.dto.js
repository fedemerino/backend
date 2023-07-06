class UsersDto{
    constructor(user){
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }
}
module.exports = {
    UsersDto
}