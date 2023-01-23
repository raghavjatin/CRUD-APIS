import Joi from "joi";
import { gender } from "../../database/enums/employee";
import { phoneValidation, requiredEmailValidation, requiredStringValidation } from "./common";

export const employee = Joi.object({
  email: requiredEmailValidation("email"),
  firstName: requiredStringValidation("firstName"),
  lastName: requiredStringValidation("lastName"),
  gender: requiredStringValidation("gender").valid(...Object.keys(gender)),
  mobileNumber: phoneValidation("mobileNumber"),
  hireDate: Joi.date().iso().required(),
  jobTitle: requiredStringValidation("jobTitle"),
  jobTitleId: requiredStringValidation("jobTitleID").guid({ version: "uuidv4" }),
  departmentId: requiredStringValidation("departmentId").guid({ version: "uuidv4" }),
});
