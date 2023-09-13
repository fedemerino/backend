const { userModel } = require('../models/user.model')
const { UsersDto } = require('../dto/users.dto')
const { sendMail } = require('../utils/sendmail')
class UsersController {
    getUsers = async (req, res) => {
        try {
            const users = await userModel.find()
            const userDtos = users.map(user => new UsersDto(user))
            res.status(200).send(userDtos)
        }
        catch (error) {
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        }
    }

    getAllUsers = async (req, res) => {
        try {
            const users = await userModel.find()
            res.status(200).send(users)
        }
        catch (error) {
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        }
    }

    updateUser = async (req, res) => {
        try {
            const { email, role } = req.body

            const updatedUser = await userModel.findOneAndUpdate(
                { email: email },
                { role: role },
                { new: true }
            )

            if (!updatedUser) {
                return res.status(404).json({status:'error', message: 'User not found' })
            }
            res.status(200).json({status:'success', updatedUser})
        } catch (error) {
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        }
    };

    deleteInactiveUsers = async (req, res) => {
        try {
            const users = await userModel.find({ lastActive: { $lt: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)) } })
            if (users.length == 0) {
                res.status(200).send({ status: 'success', users: [] })
                return
            }
            users.forEach(async (user) => {
                let to = user.email
                let subject = 'Aviso de suspensión de cuenta'
                let html = `<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <title>Cuenta Inhabilitada por Inactividad</title>
                </head>
                <body>
                    <table width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td align="center" style="background-color: #f5f5f5; padding: 20px;">
                                <table width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 5px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);">
                                    <tr>
                                        <td align="center" style="padding: 40px;">
                                            <h1 style="color: #333333; font-family: Arial, sans-serif;">Cuenta Inhabilitada por Inactividad</h1>
                                            <p style="color: #666666; font-family: Arial, sans-serif; font-size: 16px;">Estimado usuario,</p>
                                            <p style="color: #666666; font-family: Arial, sans-serif; font-size: 16px;">Lamentamos informarle que su cuenta ha sido inhabilitada debido a la inactividad prolongada. Para volver a habilitar tu cuenta, por favor ponte en contacto con nuestro servicio de atención al cliente.</p>
                                            <p style="color: #666666; font-family: Arial, sans-serif; font-size: 16px;">Gracias por utilizar nuestros servicios.</p>
                                            <p style="color: #666666; font-family: Arial, sans-serif; font-size: 16px;">Atentamente,</p>
                                            <p style="color: #666666; font-family: Arial, sans-serif; font-size: 16px;">Sneakers</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>`
                await sendMail(to, subject, html)
            })
            await userModel.deleteMany({ lastActive: { $lt: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)) } })
            res.status(200).send({ status: 'success', users })
        }
        catch (error) {
            req.logger.error(`error @ ${req.method} en ${req.originalUrl} -  ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        }
    }
}

module.exports = new UsersController()