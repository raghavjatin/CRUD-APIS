import express from "express";
import Container from "typedi";
import ProductController from "../controller/product.controller";

class Product {
  public router: express.Router = express.Router();
  public readonly productController: ProductController;

  constructor() {
    this.productController = Container.get(ProductController);
    this.assign();
  }

  private assign() {
    this.router.get("/", this.productController.findAllProducts);
    this.router.post("/", this.productController.createProduct);
    this.router.get("/:id", this.productController.findProductById);
    this.router.put("/:id", this.productController.updateProductDetails);
    this.router.delete("/:id", this.productController.deleteProductById);
  }
}

export default new Product().router;
