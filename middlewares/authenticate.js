const jwt = require('jsonwebtoken');

require('dotenv').config();
const { SECRET_KEY } = process.env;

const { requestErrorHandler } = require("../helpers");
const { User } = require('../models/user');
const { TokenBlackList } = require('../models/tokenBlackList');

const authenticate = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (!token) next(requestErrorHandler(401, 'Not authorized'));
    if (bearer !== 'Bearer') next(requestErrorHandler(401, 'Not authorized'));

    try {
        const isTokenBlacklisted = await TokenBlackList.findOne({ token });

        if (isTokenBlacklisted) next(requestErrorHandler(401, 'Not authorized'));

        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        
        if (!user) {
            next(requestErrorHandler(401, 'Not authorized'));
        }
        req.user = user;
        next();

    } catch (error){
        next(requestErrorHandler(401, 'Not authorized'));
    }
}

module.exports = authenticate;