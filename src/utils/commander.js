const { Command } = require("commander")

const program = new Command()

program.option("--mode <mode>", "modo de trabajo", "development").parse()

module.exports = { program }
