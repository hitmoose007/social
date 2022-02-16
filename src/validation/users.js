const joi = require('joi');

const userRegisterationSchema = joi.object({
  
    email: joi.string().email().required(),
    password: joi.string().required(),
});

const userUpdateSchema = joi.object({
    previousPassword: joi.string().required(),
    newEmail: joi.string().email(),
    newPassword: joi.string(),
}).or('newEmail', 'newPassword');

const userDeleteSchema = joi.object({
    Password: joi.string().required(),
});

module.exports = {
    userRegisterationSchema,
    userUpdateSchema,
    userDeleteSchema
};