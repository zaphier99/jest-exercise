const request = require("supertest");
const app = require("../../src/server");

describe("API Tests", () => {
  
  test("GET /items should return an array", async () => {
    // Arrange
    // No special setup needed, using default data in server.js

    // Act
    const response = await request(app).get("/items");

    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /items/:id should return an item if it exists", async () => {
    // Arrange
    const existingId = 1;

    // Act
    const response = await request(app).get(`/items/${existingId}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", existingId);
  });

  test("GET /items/:id should return 404 if item does not exist", async () => {
    // Arrange
    const nonExistentId = 999;

    // Act
    const response = await request(app).get(`/items/${nonExistentId}`);

    // Assert
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Item not found");
  });

  test("POST /items should create a new item", async () => {
    // Arrange
    const newItem = { name: "Test Item" };

    // Act
    const response = await request(app).post("/items").send(newItem);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", newItem.name);
  });

  test("DELETE /items/:id should delete an item if it exists", async () => {
    // Arrange
    const idToDelete = 1;

    // Act
    const response = await request(app).delete(`/items/${idToDelete}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Item deleted");
  });

  test("DELETE /items/:id should return 404 if item does not exist", async () => {
    // Arrange
    const nonExistentId = 999;

    // Act
    const response = await request(app).delete(`/items/${nonExistentId}`);

    // Assert
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Item not found");
  });
});