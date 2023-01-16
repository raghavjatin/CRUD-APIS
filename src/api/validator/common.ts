import Joi from "joi";

const requiredStringValidation = (key: string): Joi.StringSchema =>
  Joi.string()
    .required()
    .messages({
      "string.base": `${key} must be a string`,
      "any.required": `${key} is required`,
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

const optionalNumberValidation = (key: string): Joi.NumberSchema =>
  Joi.number().messages({
    "number.base": `${key} must be a number`,
    "any.required": `${key} is required`,
  });

export {
  requiredStringValidation,
  optionalStringValidation,
  requiredNumberValidation,
  optionalNumberValidation,
};
