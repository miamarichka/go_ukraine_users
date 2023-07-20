const mongoose = require('mongoose');
const Joi = require('joi');

const {EMAIL_REGEX} = require('../../utils/patterns');
const { mongooseErrorHandler } = require('../../helpers');

const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(16).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).pattern(EMAIL_REGEX).required(),
});

const logInSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).pattern(EMAIL_REGEX).required(),
    password: Joi.string().min(6).max(16).required(),
});

const editSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(16).required(),
    newPassword: Joi.string().min(6).max(16).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).pattern(EMAIL_REGEX).required(),
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'Name should be at least 3 characters long'],
        maxlength: [30, 'Name should not exceed 30 characters'],
        required: [true, 'Enter user name']
    },
    password: {
        type: String,
        minlength: [6, 'Password should be at least 6 characters long'],
        required: [true, 'Enter user password']
    },
    email: {
        type: String,
        match: EMAIL_REGEX,
        unique: true,
        required: [true, 'Enter user password']
    },
    avatarID: {
        type: String
    },
    avatarURL: {
        type: String
    }
}, { versionKey: false, timestamps: true })

userSchema.post('save', mongooseErrorHandler);

const User = mongoose.model('user', userSchema);


module.exports = { User, signUpSchema, logInSchema, editSchema }