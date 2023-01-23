import Joi from "joi";
import {
  optionalStringValidation,
  requiredNumberValidation,
  requiredQuantityValidation,
  requiredStringValidation,
} from "./common";

export const product = Joi.object({
  productName: requiredStringValidation("productName"),
  quantity: requiredQuantityValidation("quantity"),
  price: requiredNumberValidation("price"),
  description: optionalStringValidation("description"),
});
