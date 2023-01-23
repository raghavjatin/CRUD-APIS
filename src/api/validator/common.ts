import Joi from "joi";

const requiredStringValidation = (key: string): Joi.StringSchema =>
  Joi.string()
    .required()
    .messages({
      "string.base": `${key} must be a string`,
      "any.required": `${key} is required`,
    });

const requiredEmailValidation = (key: string): Joi.StringSchema =>
  Joi.string()
    .email()
    .required()
    .messages({
      "string.base": `${key} must be a string`,
      "string.empty": `${key} is required`,
      "any.required": `${key} is required`,
      "string.email": `${key} is invalid`,
    });

const optionalStringValidation = (key: string): Joi.StringSchema =>
  Joi.string().messages({
    "string.base": `${key} must be a string`,
    "any.required": `${key} is required`,
  });

const requiredNumberValidation = (key: string): Joi.NumberSchema =>
  Joi.number()
    .required()
    .messages({
      "number.base": `${key} must be a number`,
      "any.required": `${key} is required`,
    });

const requiredQuantityValidation = (key: string): Joi.NumberSchema =>
  Joi.number()
    .integer()
    .min(0)
    .max(100)
    .required()
    .messages({
      "number.base": `${key} must be a number`,
      "any.required": `${key} is required`,
    });

const optionalNumberValidation = (key: string): Joi.NumberSchema =>
  Joi.number().messages({
    "number.base": `${key} must be a number`,
    "any.required": `${key} is required`,
  });

const phoneValidation = (key: string): Joi.StringSchema =>
  Joi.string()
    .required()
    .regex(/^[ 0-9+]*$/)
    .messages({
      "string.base": `${key} must be in a valid format`,
      "any.required": `${key} is required`,
      "string.pattern.base": `${key} is not in valid format`,
      "string.empty": `${key} is not in valid format`,
    });

const dateValidation = (key: string): Joi.StringSchema =>
  Joi.string()
    .required()
    .regex(/^\d{2}-\d{2}-\d{4}$/)
    .messages({
      "string.base": `${key} must be in a valid format`,
      "any.required": `${key} is required`,
      "string.pattern.base": `${key} is not in valid format`,
      "string.empty": `${key} is not in valid format`,
    });

export {
  requiredStringValidation,
  optionalStringValidation,
  requiredNumberValidation,
  requiredQuantityValidation,
  requiredEmailValidation,
  optionalNumberValidation,
  phoneValidation,
  dateValidation,
};
