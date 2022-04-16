const joi = require("joi");

const commentsCreateSchema = joi.object({
    content: joi.string().required().max(350),
}); 

const commentUpdateSchema = joi.object({
    content: joi.string().max(350),
});



module.exports = { commentsCreateSchema, commentUpdateSchema };