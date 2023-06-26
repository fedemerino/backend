const commander = require("commander")

const program = new commander.Command()

program
  .option("-d", "variable para debug", false)
  .option("-p, --port <number>", "puerto para el server", 8080)
  .option("--mode <mode>", "modo de ejecucion", "production")
  .requiredOption(
    "-u, --user <user>",
    "usuario que utiliza la app",
    "no se ha declarado un usuario"
  )
  .option("-l, --letters [letters...]", "letras que se van a utilizar")

program.parse()
/* console.log("options: ", program.opts())
console.log("remaining: ", program.args)
 */
process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`)
})

process.on("uncaughtException", (exception) => {
    console.log('uncaughtException', exception)
})

process.on("message", (msg) => {
  console.log("Message from parent:", msg)
})