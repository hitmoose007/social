const { userRegisterationSchema, userUpdateSchema } = require("./users");
const loginSchema = require("./auth");
module.exports = {
  userRegisterationValidator: (data) => userRegisterationSchema.validate(data),
  userUpdateValidator: (data) => userUpdateSchema.validate(data),
  loginValidator: (data) => loginSchema.validate(data),
};
