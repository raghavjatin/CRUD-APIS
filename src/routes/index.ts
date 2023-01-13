import { Application } from "express";
import productRoute from "./product.route";

export class Routes {
  public routes(app: Application): void {
    // resource and routes mapping comes here
    app.use("/api/product", productRoute);
  }
}
