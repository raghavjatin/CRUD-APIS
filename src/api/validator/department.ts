import Joi from "joi";
import { requiredStringValidation } from "./common";

export const department = Joi.object({
  departmentName: requiredStringValidation("departmentName"),
});
