const {catchAsyncWrapper} = require('../../helpers')
const userSignUp = require('./userSignUp');
const userLogIn = require('./userLogIn');
const userLogOut = require('./userLogOut');
const userAvatar = require('./userAvatar');
const userCurrent = require('./userCurrent');
const userEditData = require('./userEditData');

module.exports = {
    userSignUp: catchAsyncWrapper(userSignUp),
    userLogIn: catchAsyncWrapper(userLogIn),
    userLogOut: catchAsyncWrapper(userLogOut),
    userAvatar: catchAsyncWrapper(userAvatar),
    userCurrent: catchAsyncWrapper(userCurrent),
    userEditData: catchAsyncWrapper(userEditData),
}