const joi = require("joi");

const postSchema = joi.object({
    id: joi.string().required(),
    title: joi.string().required(),
    content: joi.string(),
    
}); 