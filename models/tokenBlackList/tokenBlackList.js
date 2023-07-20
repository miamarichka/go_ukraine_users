const mongoose = require('mongoose');

const { mongooseErrorHandler } = require('../../helpers');

const tokenBlackListSchema = mongoose.Schema({
    token: {
        type: String,
        required: [true, 'Provide a token']
    }
}, { versionKey: false, timestamps: true });

tokenBlackListSchema.post('save', mongooseErrorHandler);

const TokenBlackList = mongoose.model('tokenBlackList', tokenBlackListSchema)

module.exports = {
    TokenBlackList,
}