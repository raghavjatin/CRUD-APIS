import Joi from "joi";
import { requiredStringValidation } from "./common";

export const leave = Joi.object({
  employeeId: requiredStringValidation("employeeId").guid({ version: "uuidv4" }),
  fromDate: Joi.date().iso().required(),
  toDate: Joi.date().iso().required(),
  reason: requiredStringValidation("reason"),
});
