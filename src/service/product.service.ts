import { IProduct } from "@type/product";
import { Service } from "typedi";
import { Product } from "../entity/product.model";
import { AppDataSource } from "../connection/connection";

@Service()
export class ProductService {
  // fetch all product details
  public async findProduct(): Promise<IProduct[]> {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find();

    const productArray = (products || []).map((product: IProduct) => ({
      id: product.id,
      productName: product.productName,
      price: product.price,
      quatity: product.quantity,
      description: product.description,
    }));
    return productArray;
  }

  // fetch product details by product id
  public async findProductById(product_id: string): Promise<IProduct> {
    const productRepository = AppDataSource.getRepository(Product);
    const findProduct = await productRepository.findOne({ where: { id: product_id } });
    return findProduct;
  }

  // create new product
  public async createProduct(product: Product): Promise<IProduct> {
    const productRepository = AppDataSource.getRepository(Product);
    const newProduct = await productRepository.save(product);
    return newProduct;
  }

  // update product
  public async updateProduct(product: Product, product_id: string): Promise<IProduct> {
    const productRepository = AppDataSource.getRepository(Product);
    const findProduct = await productRepository.findOne({ where: { id: product_id } });
    return productRepository.save({
      ...findProduct, // existing fields
      ...product, // updated fields
    });
  }

  // delete product by id
  public async deleteProduct(id: string): Promise<IProduct> {
    const productRepository = AppDataSource.getRepository(Product);
    const findProduct = await productRepository.findOne({ where: { id } });
    const deletedProduct = await productRepository.remove(findProduct);

    return deletedProduct;
  }
}
