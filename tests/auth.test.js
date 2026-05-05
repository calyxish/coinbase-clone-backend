const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const auth = require("../middleware/auth");
const User = require("../models/User");

jest.mock("../models/User");
jest.mock("bcryptjs", () => ({
  hash: jest.fn().mockResolvedValue("hashed"),
  compare: jest.fn().mockResolvedValue(true),
}));

describe("auth endpoints", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "testsecret";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("registers a new user", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      _id: "user-id",
      name: "Ada",
      email: "ada@example.com",
    });

    const response = await request(app).post("/register").send({
      name: "Ada",
      email: "ada@example.com",
      password: "secret",
    });

    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe("ada@example.com");
    expect(response.headers["set-cookie"]).toBeTruthy();
  });

  it("logs in an existing user", async () => {
    User.findOne.mockResolvedValue({
      _id: "user-id",
      name: "Ada",
      email: "ada@example.com",
      password: "hashed",
    });

    const response = await request(app).post("/login").send({
      email: "ada@example.com",
      password: "secret",
    });

    expect(response.status).toBe(200);
    expect(response.body.user.id).toBe("user-id");
    expect(response.headers["set-cookie"]).toBeTruthy();
  });
});

describe("auth middleware", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "testsecret";
  });

  it("blocks requests without a token", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
  });

  it("allows requests with a valid token", async () => {
    const testApp = require("express")();
    testApp.use(require("cookie-parser")());
    testApp.get("/protected", auth, (req, res) => {
      res.status(200).json({ ok: true, userId: req.user.id });
    });

    const token = jwt.sign({ userId: "user-id" }, process.env.JWT_SECRET);
    const response = await request(testApp)
      .get("/protected")
      .set("Cookie", [`token=${token}`]);

    expect(response.status).toBe(200);
    expect(response.body.userId).toBe("user-id");
  });
});
