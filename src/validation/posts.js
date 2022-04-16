const joi = require("joi");

const postSchema = joi.object({

    title: joi.string().required(),
    content: joi.string().required().max(500),


}); 

const postUpdateSchema = joi.object({
  
    title: joi.string(),
    content: joi.string().max(500),
    
});


module.exports = { postSchema, postUpdateSchema };