import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./api/routes";
import { DBConnection } from "./database/connection";

class App {
  // private app: express.Application;
  public app: express.Application = express();
  private router: Routes = new Routes();

  constructor() {
    this.app = express(); // init the application
    this.configuration();
    this.routes();
    this.router.routes(this.app);
    DBConnection.databaseConnection();
  }
  public async configuration(): Promise<void> {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
  }

  /**
   * Method to configure the routes
   */
  public async routes(): Promise<void> {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello world!");
    });

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }
  /**
   * Used to start the server
   */
  public async start(): Promise<void> {
    const server = this.app.listen(this.app.get("port"), () => {
      // eslint-disable-next-line no-console
      console.log(`Server is listening ${this.app.get("port")} port.`);
    });
    server.close();
  }
}

const server = new App(); // Create server instance
server.start(); // Execute the server
export default new App().app;
