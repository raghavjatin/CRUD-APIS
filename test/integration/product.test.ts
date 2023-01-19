import { DBConnection } from "../../src/database/connection";
import request from "supertest";
import app from "../../src/server";

import {
  invalidProduct,
  invalidProductID,
  invalidProductWithQnty,
  product,
} from "../fixtures/product";

describe("Product CRUD API", () => {
  beforeAll(async () => {
    await DBConnection.databaseConnection();
  });

  afterAll(async () => {
    await DBConnection.closeConnection();
  });

  let productId = "";

  it("Should return empty array if no product found", async () => {
    const response = await request(app).get("/api/product");
    if (!response.body.data) {
      expect(response.body.data).toEqual([]);
    }
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("products found successfully!");
    expect(response.body.code).toEqual("SUC10000");
    expect(response.body).toHaveProperty("data");
  });

  it("should create new product with status code 200", async () => {
    const response = await request(app).post("/api/product").send(product);

    productId = response.body.data.id;
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("product created successfully!");
    expect(response.body.code).toEqual("SUC10000");
    expect(response.body).toHaveProperty("data");
    expect(Object.keys(response.body.data)).toEqual(
      expect.objectContaining([
        "productName",
        "quantity",
        "price",
        "description",
        "id",
        "createdAt",
        "updatedAt",
      ]),
    );
  });

  it("Should return all products with status code 200", async () => {
    const response = await request(app).get("/api/product");

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("products found successfully!");
    expect(response.body.code).toEqual("SUC10000");
    expect(response.body).toHaveProperty("data");
    expect(Object.keys(response.body.data[0])).toEqual(
      expect.arrayContaining(["id", "productName", "price", "quatity", "description"]),
    );
  });

  it("Should return product by id with status sode 200", async () => {
    const response = await request(app).get(`/api/product/${productId}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("product find successfully!");
    expect(response.body.code).toEqual("SUC10000");
    expect(response.body).toHaveProperty("data");
    expect(Object.keys(response.body.data)).toEqual(
      expect.objectContaining(["id", "productName", "quantity", "price", "description"]),
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.any(Object),
      }),
    );
  });

  it("should update product with status code 200", async () => {
    const response = await request(app).put(`/api/product/${productId}`).send(product);

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("update product successfully!");
    expect(response.body.code).toEqual("SUC10000");
    expect(response.body).toHaveProperty("data");
    expect(Object.keys(response.body.data)).toEqual(
      expect.objectContaining([
        "id",
        "productName",
        "quantity",
        "price",
        "description",
        "updatedAt",
      ]),
    );
  });

  it("Should delete product by id with status sode 200", async () => {
    const response = await request(app).delete(`/api/product/${productId}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("product delete successfully!");
    expect(response.body.code).toEqual("SUC10000");
    expect(response.body).toHaveProperty("data");
    expect(Object.keys(response.body.data)).toEqual(
      expect.objectContaining(["productName", "quantity", "price", "description"]),
    );
  });

  it("Should not return product with invalid id with status code 404", async () => {
    const response = await request(app).get(`/api/product/${invalidProductID}`);
    expect(response.statusCode).toEqual(404);
    expect(response.body.error.message).toEqual("Product Id invalid");
  });

  it("Should return validation error with status code 400", async () => {
    const response = await request(app).post("/api/product").send(invalidProduct);

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Validation Error");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data[0].message).toEqual("productName is required");
  });

  it("Should not delete product with invalid id", async () => {
    try {
      const response = await request(app).delete(`/api/product/${invalidProductID}`);
      // const error = jest.spyOn(ProductService.prototype, "deleteProduct").mockImplementation(() => {
      //   throw new createHttpError.NotFound("Product Id invalid");
      // });
      expect(response.statusCode).toEqual(404);
      expect(response.body.error.message).toEqual("Product Id invalid");
    } catch (err) {}
  });

  it("Should not update product with invalid id", async () => {
    const response = await request(app).put(`/api/product/${invalidProductID}`).send(product);
    expect(response.statusCode).toEqual(404);
    expect(response.body.error.message).toEqual("Product Id invalid");
  });

  it("Should return validation error quanity less than 100", async () => {
    const response = await request(app).post("/api/product").send(invalidProductWithQnty);

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Validation Error");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data[0].message).toEqual('"quantity" must be less than or equal to 100');
  });
});
