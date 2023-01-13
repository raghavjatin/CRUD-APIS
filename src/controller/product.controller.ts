import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";
import constant from "../config/constant";
import { Product } from "../entity/product.model";
import { ProductService } from "../services/product.service";
import { ResponseParser } from "../util/response-parser";

@Service()
class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly responseParser: ResponseParser,
  ) {
    this.productService = new ProductService();
  }

  public findAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.findProduct();
      this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(products)
        .setMessage("products found successfully!")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = req["body"] as Product;
      const newProduct = await this.productService.createProduct(product);
      this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(newProduct)
        .setMessage("product created successfully!")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public findProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req paramn", req.params);
      const products = await this.productService.findProductById(req.params.id);
      this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(products)
        .setMessage("product find successfully!")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public updateProductDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = req["body"] as Product;
      const product_id = req["params"]["id"];
      const updateProduct = await this.productService.updateProduct(product, product_id);
      this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(updateProduct)
        .setMessage("update product successfully!")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req["params"]["id"];
      const result = await this.productService.deleteProduct(Number(id));
      this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("product delete successfully!")
        .send(res);
    } catch (err) {
      next(err);
    }
  };
}

export default ProductController;
