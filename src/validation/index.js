const userRegisterationSchema = require('./users');
const loginSchema = require('./auth');
module.exports ={
    userRegisterationValidator:(data) => userRegisterationSchema.validate(data)
    ,loginValidator:(data) => loginSchema.validate(data)
}