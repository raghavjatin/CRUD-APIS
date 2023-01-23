import createHttpError from "http-errors";
import request from "supertest";
import app from "../../src/server";
import { ProductService } from "../../src/service/product.service";
import { product } from "../fixtures/product";

jest.useFakeTimers();

describe("Product CRUD API", () => {
  it("Should created new product", async () => {
    const mockCreateTodo = jest.fn((): any => product);
    const callApi = jest
      .spyOn(ProductService.prototype, "createProduct")
      .mockImplementation(() => mockCreateTodo());

    const response = await request(app).post("/api/product").send(product);

    expect(mockCreateTodo).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("product created successfully!");
    expect(response.body.code).toEqual("SUC10000");
    expect(response.body).toHaveProperty("data");
    expect(Object.keys(response.body.data)).toEqual(
      expect.objectContaining(["productName", "quantity", "price", "description"]),
    );
  });

  it("Should return array of product", async () => {
    const mockReadAllTodo = jest.fn((): any => [product]);
    jest.spyOn(ProductService.prototype, "findProduct").mockImplementation(() => mockReadAllTodo());

    const res = await request(app).get("/api/product");

    expect(mockReadAllTodo).toHaveBeenCalledTimes(1);
    expect(res.body.data).toEqual([product]);
  });
});
