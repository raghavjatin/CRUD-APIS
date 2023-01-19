import Joi from "joi";
import { requiredStringValidation } from "./common";

export const jobTitle = Joi.object({
  jobTitleName: requiredStringValidation("jobTitleName"),
  jobDescripton: requiredStringValidation("jobDescripton"),
});
