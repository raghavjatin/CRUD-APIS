import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import { JobTitleService } from "../../service/jobtitle.service";
import constant from "../../config/constant";
import { ResponseParser } from "../../util/response-parser";

@Service()
class JobTitleController {
  constructor(
    private readonly jobTitleService: JobTitleService,
    private readonly responseParser: ResponseParser,
  ) {
    this.jobTitleService = new JobTitleService();
  }

  public findJobTitles = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const jobTitle = await this.jobTitleService.findJobTitles();
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(jobTitle)
        .setMessage("job title found successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public createJobTitle = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = req.body;
      const newJobTitle = await this.jobTitleService.createJobTitle(data);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(newJobTitle)
        .setMessage("job title created successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public updateJobTitleDetails = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = req.body;
      const {
        params: { id },
      } = req;
      const updateJobTitle = await this.jobTitleService.updateJobTitle(data, id);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(updateJobTitle)
        .setMessage("update job title successfully")
        .send(res);
    } catch (err) {
      res.status(err.status);
      res.json({
        error: {
          message: err.message,
        },
      });
    }
  };

  public deleteJobTitleById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        params: { id },
      } = req;
      const result = await this.jobTitleService.deleteJobTitle(id);

      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("job title delete successfully")
        .send(res);
    } catch (err) {
      res.status(err.status);
      res.json({
        error: {
          message: err.message,
        },
      });
    }
  };
}

export default JobTitleController;
