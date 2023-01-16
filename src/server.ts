import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./connection/connection";
import { Routes } from "./api/routes";

class Server {
  private app: express.Application;
  private router: Routes = new Routes();

  constructor() {
    this.app = express(); // init the application
    this.configuration();
    this.routes();
    this.router.routes(this.app);

    AppDataSource.initialize()
      .then(() => {
        // db initialized
        // console.log("DB Connected!!");
      })
      .catch((err: Error) => {
        throw new Error(`'Database connection error: ${err}`);
      });
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
    this.app.listen(this.app.get("port"), () => {
      // console.log(`Server is listening ${this.app.get("port")} port.`);
    });
  }
}

const server = new Server(); // Create server instance
server.start(); // Execute the server
