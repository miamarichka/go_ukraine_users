const bcrypt = require("bcrypt");

const { requestErrorHandler } = require("../helpers");

const checkPassword = async (req, res, next) => {
    const { user } = req;
    const { password } = req.body;

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        next(requestErrorHandler(401, "Current password isn`t correct"))
    }
    next();
};

module.exports = checkPassword; 