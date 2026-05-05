const request = require("supertest");

const app = require("../app");
const Crypto = require("../models/Crypto");
const User = require("../models/User");

jest.mock("../models/Crypto");
jest.mock("../models/User");

describe("error handling", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "testsecret";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns 404 for unknown routes", async () => {
    const response = await request(app).get("/nope");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Not found");
  });

  it("handles controller errors", async () => {
    Crypto.find.mockReturnValue({
      sort: jest.fn().mockRejectedValue(new Error("DB failure")),
    });

    const response = await request(app).get("/crypto");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("DB failure");
  });

  it("handles duplicate key errors", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockRejectedValue({ code: 11000 });

    const response = await request(app).post("/register").send({
      name: "Ada",
      email: "ada@example.com",
      password: "secret",
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Duplicate key error");
  });
});
