const { TokenBlackList } = require("../../models/tokenBlackList");

const userLogOut = async (req, res) => {
    const { authorization = '' } = req.headers;
    const token = authorization.split(' ')[1];

    await TokenBlackList.create({token});

    req.headers = ''

    res.status(200).json({message: "Logout success"})
}

module.exports = userLogOut;