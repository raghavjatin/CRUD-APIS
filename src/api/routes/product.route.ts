import express from "express";
import Container from "typedi";
import HttpRequestValidator from "../../middleware/http-request-validator";
import ProductController from "../controller/product.controller";
import { product } from "../validator/product";

class Product {
  public router: express.Router = express.Router();
  private httpRequestValidator: HttpRequestValidator;

  public readonly productController: ProductController;

  constructor() {
    this.productController = Container.get(ProductController);
    this.httpRequestValidator = new HttpRequestValidator();
    this.assign();
  }

  private assign(): void {
    this.router.get("/", this.productController.findAllProducts);
    this.router.post(
      "/",
      this.httpRequestValidator.validate("body", product),
      this.productController.createProduct,
    );
    this.router.get("/:id", this.productController.findProductById);
    this.router.put(
      "/:id",
      this.httpRequestValidator.validate("body", product),
      this.productController.updateProductDetails,
    );
    this.router.delete("/:id", this.productController.deleteProductById);
  }
}

export default new Product().router;
