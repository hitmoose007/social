const joi = require("joi");

//schema for login
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = loginSchema;
