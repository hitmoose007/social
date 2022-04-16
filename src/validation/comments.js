const joi = require("joi");

const commentsCreateSchema = joi.object({
    content: joi.string().required(),
}); 

const commentUpdateSchema = joi.object({
    content: joi.string(),
});



module.exports = { commentsCreateSchema, commentUpdateSchema };