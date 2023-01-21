import Joi from "joi";
import { requiredStringValidation } from "./common";

export const attendance = Joi.object({
  timeIn: Joi.date().iso().required(),
  timeOut: Joi.date().iso().required(),
  employeeId: requiredStringValidation("employeeId").guid({ version: "uuidv4" }),
});
