import { Jobtitle } from "@database/model/jobtitle.model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Jobtitle)
export class JobTitleRepo extends Repository<Jobtitle> {}