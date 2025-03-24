import Joi from "joi";

const userValidate = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Full name should be a type of text.',
            'string.empty': 'Name is required!',
            'string.min': 'Full name should have at least 3 characters.',
            'string.max': 'Full name should have at most 30 characters.',
            'any.required': 'Name is required!',
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email address!',
            'string.empty': 'Email is required!',
            'any.required': 'Email is required!',
        }),
    password: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.min': 'Password should have at least 3 characters.',
            'string.empty': 'Password is required!',
            'any.required': 'Password is required!',
        }),
});

export default userValidate;