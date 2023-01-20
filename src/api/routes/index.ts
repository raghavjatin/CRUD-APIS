import { Application } from "express";
import departmentRoute from "./department.route";
import employeeRoute from "./employee.route";
import jobtitleRoute from "./jobtitle.route";
import productRoute from "./product.route";

export class Routes {
  public routes(app: Application): void {
    // resource and routes mapping comes here
    app.use("/api/product", productRoute);
    app.use("/api/department", departmentRoute);
    app.use("/api/jobtitle", jobtitleRoute);
    app.use("/api/employee", employeeRoute);
  }
}
