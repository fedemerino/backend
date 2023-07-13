exports.generateUserErrorInfo = (user) => {
    return `One or more of the following fields are invalid:
    * username: expected string, received ${typeof user.username}
    * password: expected string, received ${typeof user.password}
    * email: expected string, received ${typeof user.email}
    * first_name: expected string, received ${typeof user.first_name}
    * last_name: expected string, received ${typeof user.last_name}
    `
}
