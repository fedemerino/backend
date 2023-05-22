const Handlebars = require('handlebars');
Handlebars.registerHelper('multiply', function (a, b) {
    return a * b
})
