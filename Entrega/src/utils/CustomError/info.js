exports.generateUserErrorInfo = (user) => {
    return `One or more of the following fields are invalid:
    * username: expected string, received ${typeof user.username}
    * password: expected string, received ${typeof user.password}
    * email: expected string, received ${typeof user.email}
    * first_name: expected string, received ${typeof user.first_name}
    * last_name: expected string, received ${typeof user.last_name}
    `
}

exports.createProductErrorInfo = (product) => {
    return `One or more of the following fields are invalid:
    * title: expected string, received ${typeof product.title}
    * description: expected string, received ${typeof product.description}
    * code: expected string, received ${typeof product.code}
    * price: expected number, received ${typeof product.price}
    * stock: expected number, received ${typeof product.stock}
    * category: expected string, received ${typeof product.category}
    * thumbnail: expected string, received ${typeof product.thumbnail}
    * featured: expected boolean, received ${typeof product.featured}
    `
}