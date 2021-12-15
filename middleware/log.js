const Log = require('../models/log')
module.exports = async (req, res, next) => {
    try {
        let requestBody = {...req.body}
        let path = req.path
        let log = new Log({requestBody, path, ...req.user })
        await log.save()
        next()
    } catch (e) {
        res.send('log module error')
    }
}