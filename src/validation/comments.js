const joi = require("joi");

const commentsSchema = joi.object({
    userId: joi.string().required(),
    content: joi.string().required(),
}); 

const commentUpdateSchema = joi.object({
    content: joi.string(),
});



module.exports = { commentsSchema, commentUpdateSchema };