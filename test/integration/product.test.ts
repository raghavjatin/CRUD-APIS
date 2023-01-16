import { DBConnection } from "../../src/database/connection";
import request from "supertest";
import app from "../../src/server";
import { invalidProduct, invalidProductID, product } from "../fixtures/product";

describe("Product CRUD API", () => {
  beforeAll(async () => {
    await DBConnection.databaseConnection();
  });

  afterAll(async () => {
    await DBConnection.closeConnection();
  });

  let productId = "";

  it("Should return all products with status code 200", async () => {
    const response = await request(app).get("/api/product");

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
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("productName");
    expect(response.body.data).toHaveProperty("quantity");
    expect(response.body.data).toHaveProperty("price");
    expect(response.body.data).toHaveProperty("description");
  });

  it("Should return product by id with status sode 200", async () => {
    const response = await request(app).get(`/api/product/${productId}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("product find successfully!");
    expect(response.body.code).toEqual("SUC10000");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("productName");
    expect(response.body.data).toHaveProperty("quantity");
    expect(response.body.data).toHaveProperty("price");
    expect(response.body.data).toHaveProperty("description");
  });

  it("should update product with status code 200", async () => {
    const response = await request(app).put(`/api/product/${productId}`).send(product);

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("update product successfully!");
    expect(response.body.code).toEqual("SUC10000");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("productName");
    expect(response.body.data).toHaveProperty("quantity");
    expect(response.body.data).toHaveProperty("price");
    expect(response.body.data).toHaveProperty("description");
  });

  it("Should delete product by id with status sode 200", async () => {
    const response = await request(app).delete(`/api/product/${productId}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("product delete successfully!");
    expect(response.body.code).toEqual("SUC10000");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("productName");
    expect(response.body.data).toHaveProperty("quantity");
    expect(response.body.data).toHaveProperty("price");
    expect(response.body.data).toHaveProperty("description");
  });

  it("Should not return product with invalid id with status code 404", async () => {
    const response = await request(app).get(`/api/product/${invalidProductID}`);
    expect(response.statusCode).toEqual(404);
  });

  it("Should return validation error with status code 400", async () => {
    const response = await request(app).post("/api/product").send(invalidProduct);

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Validation Error");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data[0].message).toEqual("productName is required");
  });

  it("Should not delete product with invalid id", async () => {
    const response = await request(app).get(`/api/product/${invalidProductID}`);
    expect(response.statusCode).toEqual(404);
  });

  it("Should not update product with invalid id", async () => {
    const response = await request(app).put(`/api/product/${invalidProductID}`).send(product);
    expect(response.statusCode).toEqual(404);
  });
});
