const { userRegisterationSchema, userUpdateSchema, userDeleteSchema, } = require("./users");
const loginSchema = require("./auth");
const { postSchema, postUpdateSchema, postDeleteSchema, } = require("./posts");
const { commentSchema, commentUpdateSchema, } = require("./comments");


module.exports = {
  userRegisterationValidator: (data) => userRegisterationSchema.validate(data),
  userUpdateValidator: (data) => userUpdateSchema.validate(data),
  userDeleteValidator: (data) => userDeleteSchema.validate(data),
  loginValidator: (data) => loginSchema.validate(data),
  postValidator: (data) => postSchema.validate(data),
  postUpdateValidator: (data) => postUpdateSchema.validate(data),
  commentValidator:(data)=> commentSchema.validate(data),
  commentUpdateValidator:(data)=> commentUpdateSchema.validate(data),
};
    
