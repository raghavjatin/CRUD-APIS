import { EntityRepository, Repository } from "typeorm";
import { Jobtitle } from "../model/jobtitle.model";

@EntityRepository(Jobtitle)
export class JobTitleRepo extends Repository<Jobtitle> {}
