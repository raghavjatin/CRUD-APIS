import Joi from "joi";
import {
  optionalStringValidation,
  requiredNumberValidation,
  requiredStringValidation,
} from "./common";

export const product = Joi.object({
  productName: requiredStringValidation("productName"),
  quantity: requiredStringValidation("quantity"),
  price: requiredNumberValidation("price"),
  description: optionalStringValidation("description"),
});
