const request = require("supertest");
const { app, resetDatabase } =  require("../../src/server");

describe("🚀 API Integration Tests", () => {
  beforeEach(() => {
    // Reset database before each test
    resetDatabase();
  });

  test("GET /items should return all items", async () => {
    // Arrange: Database already has one item
    // Act
    const response = await request(app).get("/items");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("id", 1);
  });

  test("GET /items/:id should return an existing item", async () => {
    // Arrange
    const itemId = 1;

    // Act
    const response = await request(app).get(`/items/${itemId}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", itemId);
  });

  test("POST /items should create a new item", async () => {
    // Arrange
    const newItem = { name: "Test Item" };

    // Act
    const response = await request(app).post("/items").send(newItem);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", newItem.name);

    // Confirm via GET request
    const getResponse = await request(app).get("/items");
    expect(getResponse.body.length).toBe(2);
  });

  test("DELETE /items/:id should remove an existing item", async () => {
    // Arrange
    const itemIdToDelete = 1;

    // Act
    const deleteResponse = await request(app).delete(`/items/${itemIdToDelete}`);

    // Assert
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty("message", "Item deleted");

    // Confirm via GET request
    const getResponse = await request(app).get("/items");
    expect(getResponse.body.length).toBe(0);
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
});