const express = require('express');
const CTRL = require('../../../controllers/users');
const {
    validateUserData,
    authenticate,
    ImgUploader,
    checkPassword
} = require('../../../middlewares');
const { signUpSchema, logInSchema, editSchema } = require('../../../models/user');

const router = express.Router();

router.post('/signup', validateUserData(signUpSchema), CTRL.userSignUp);
router.post('/login', validateUserData(logInSchema), CTRL.userLogIn);
router.post('/logout', authenticate, CTRL.userLogOut);
router.put('/edit',
    validateUserData(editSchema),
    authenticate,
    checkPassword,
    CTRL.userEditData);
router.post('/avatar',
    authenticate,
    (req, res, next) => {
        const userId = req.user.id;
        ImgUploader.upload("avatar", userId)(req, res, next);
    },
    ImgUploader.save,
    CTRL.userAvatar);
router.get('/current', authenticate, CTRL.userCurrent);

module.exports = router;
