const joi = require("joi");

const postSchema = joi.object({

    title: joi.string().required(),
    content: joi.string().required(),


}); 

const postUpdateSchema = joi.object({
  
    title: joi.string(),
    content: joi.string(),
    
});


module.exports = { postSchema, postUpdateSchema };