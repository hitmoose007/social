const joi = require("joi");

const postSchema = joi.object({
    id: joi.string().required(),
    title: joi.string().required(),
    content: joi.string().required(),
    userId: joi.string().required(),

}); 

const postUpdateSchema = joi.object({
  
    title: joi.string(),
    content: joi.string(),
    
});
