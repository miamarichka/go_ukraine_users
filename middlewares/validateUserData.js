const { requestErrorHandler } = require("../helpers");

const validateUserData = schema => {
    const func = (req, res, next) => {
        if (!req.body) {
            res.status(400).json({message: 'Missing fields'})
        }

        const { error } = schema.validate(req.body);

        if (error) {
            next(requestErrorHandler(404, error))
        }

        next()
    }

    return func;
}

module.exports = validateUserData;