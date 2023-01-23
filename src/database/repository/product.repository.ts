import { EntityRepository, Repository } from "typeorm";
import { Product } from "../model/product.model";

@EntityRepository(Product)
export class ProductRepo extends Repository<Product> {}
