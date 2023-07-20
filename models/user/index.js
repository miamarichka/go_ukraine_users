const {User} = require('./userModel');
const { signUpSchema } = require('./userModel');
const { logInSchema } = require('./userModel');
const { editSchema } = require('./userModel')

module.exports = { User, signUpSchema, logInSchema, editSchema }