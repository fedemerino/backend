const winston = require('winston');
const { program } = require("../utils/commander")
const { mode } = program.opts()

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
        http: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        debug: 'blue',
        http: 'blue'
    }
}
let logger
if (mode === 'development') {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelOptions.colors }),
                    winston.format.simple()
                )
            })
        ]
    })
}
if (mode === 'production') {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.File({
                filename: './errors.log',
                level: 'info',
                format: winston.format.simple()  
            })
        ]
    })
}


module.exports = logger