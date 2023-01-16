import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import constant from "../../config/constant";
import { ProductService } from "../../service/product.service";
import { ResponseParser } from "../../util/response-parser";

@Service()
class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly responseParser: ResponseParser,
  ) {
    this.productService = new ProductService();
  }

  public findAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const products = await this.productService.findProduct();
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(products)
        .setMessage("products found successfully!")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = req.body;
      const newProduct = await this.productService.createProduct(data);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(newProduct)
        .setMessage("product created successfully!")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public findProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const products = await this.productService.findProductById(req.params.id);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(products)
        .setMessage("product find successfully!")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public updateProductDetails = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = req.body;
      const {
        params: { id },
      } = req;
      const updateProduct = await this.productService.updateProduct(data, id);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(updateProduct)
        .setMessage("update product successfully!")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public deleteProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const {
        params: { id },
      } = req;
      const result = await this.productService.deleteProduct(id);
      return this.responseParser
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
