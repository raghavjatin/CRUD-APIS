import { IProduct } from "@type/product";
// eslint-disable-next-line import/no-extraneous-dependencies
import createHttpError from "http-errors";
import { Service } from "typedi";
import { getManager } from "typeorm";
import { ProductRepo } from "../database/repository/product.repository";
import { Product } from "../entity/product.model";

@Service()
export class ProductService {
  // fetch all product details
  public async findProduct(): Promise<IProduct[]> {
    try {
      const productRepository = getManager().getCustomRepository(ProductRepo);
      const products = await productRepository.find();

      const productArray = (products || []).map((product: IProduct) => ({
        id: product.id,
        productName: product.productName,
        price: product.price,
        quatity: product.quantity,
        description: product.description,
      }));
      return productArray || [];
    } catch (err) {
      throw new createHttpError.BadRequest("something wrong");
    }
  }

  // fetch product details by product id
  public async findProductById(product_id: string): Promise<IProduct> {
    try {
      const productRepository = getManager().getCustomRepository(ProductRepo);
      const findProduct = await productRepository.findOne({ where: { id: product_id } });
      return findProduct;
    } catch (err) {
      throw new createHttpError.NotFound("Product Id invalid");
    }
  }

  // create new product
  public async createProduct(product: Product): Promise<IProduct> {
    try {
      const productRepository = getManager().getCustomRepository(ProductRepo);
      const newProduct = await productRepository.save(product);
      return newProduct;
    } catch (err) {
      throw new createHttpError.BadRequest("something went wrong");
    }
  }

  // update product
  public async updateProduct(product: Product, product_id: string): Promise<IProduct> {
    try {
      const productRepository = getManager().getCustomRepository(ProductRepo);
      const findProduct = await productRepository.findOne({ where: { id: product_id } });
      return productRepository.save({
        ...findProduct, // existing fields
        ...product, // updated fields
      });
    } catch (err) {
      throw new createHttpError.NotFound("Product Id invalid");
    }
  }

  // delete product by id
  public async deleteProduct(id: string): Promise<IProduct> {
    try {
      const productRepository = getManager().getCustomRepository(ProductRepo);
      const findProduct = await productRepository.findOne({ where: { id } });
      const deletedProduct = await productRepository.remove(findProduct);

      return deletedProduct;
    } catch (err) {
      throw new createHttpError.NotFound("Product Id invalid");
    }
  }
}
