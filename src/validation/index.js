const userRegisterationSchema = require('./users');

module.exports ={
    userRegisterationValidator:(data) => userRegisterationSchema.validate(data)
}