const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const User = require("../models/User");

jest.mock("../models/User");

describe("profile endpoint", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "testsecret";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns 401 without a token", async () => {
    const response = await request(app).get("/profile");

    expect(response.status).toBe(401);
  });

  it("returns profile data with a valid token", async () => {
    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: "user-id",
        name: "Ada",
        email: "ada@example.com",
      }),
    });

    const token = jwt.sign({ userId: "user-id" }, process.env.JWT_SECRET);
    const response = await request(app)
      .get("/profile")
      .set("Cookie", [`token=${token}`]);

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe("ada@example.com");
  });
});
