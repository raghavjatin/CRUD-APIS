import { Jobtitle } from "@database/model/jobtitle.model";
import { JobTitleRepo } from "@database/repository/jobtitle.repository";
import { IJobTitle } from "@type/jobtitle";
import createHttpError from "http-errors";
import { Service } from "typedi";
import { getManager } from "typeorm";

@Service()
export class JobTitleService {
  // fetch all job title details
  public async findJobTitles(): Promise<IJobTitle[]> {
    try {
      const jobTitleRepository = getManager().getCustomRepository(JobTitleRepo);
      const jobTitles = await jobTitleRepository.find();

      const jobTitleArray = (jobTitles || []).map((jobTitle: IJobTitle) => ({
        jobTitleID: jobTitle.jobTitleID,
        jobTitleName: jobTitle.jobTitleName,
        jobDescripton: jobTitle.jobDescripton,
      }));
      return jobTitleArray || [];
    } catch (err) {
      throw new createHttpError.BadRequest("something wrong");
    }
  }

  // create Job Title
  public async createJobTitle(title: Jobtitle): Promise<IJobTitle> {
    try {
      const jobTitleRepository = getManager().getCustomRepository(JobTitleRepo);
      const newJobTitle = await jobTitleRepository.save(title);
      return newJobTitle;
    } catch (err) {
      throw new createHttpError.BadRequest("something went wrong");
    }
  }

  // update JobTitle
  public async updateJobTitle(jobTitle: Jobtitle, job_title_id: string): Promise<IJobTitle> {
    try {
      const jobTitleRepository = getManager().getCustomRepository(JobTitleRepo);
      const findJobTitle = await jobTitleRepository.findOne({ where: { id: job_title_id } });
      return jobTitleRepository.save({
        ...findJobTitle, // existing fields
        ...jobTitle, // updated fields
      });
    } catch (err) {
      throw new createHttpError.NotFound("JobTitle Id invalid");
    }
  }

  // delete JobTitle by id
  public async deleteJobTitle(id: string): Promise<IJobTitle> {
    try {
      const jobTitleRepository = getManager().getCustomRepository(JobTitleRepo);
      const findJobTitle = await jobTitleRepository.findOne({ where: { id } });
      const deletedJobTitle = await jobTitleRepository.remove(findJobTitle);

      return deletedJobTitle;
    } catch (err) {
      throw new createHttpError.NotFound("JobTitle Id invalid");
    }
  }
}
