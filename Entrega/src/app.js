const cluster = require("cluster");
const { cpus } = require("os");
const { initServer } = require("./server");
const logger = require("./config/logger");

if (cluster.isPrimary) {
    for(let i=0; i<cpus().length; i++) {
    cluster.fork()
    }
}
else {
    logger.info('proceso secundario, ejecutando server')
    initServer()
}

