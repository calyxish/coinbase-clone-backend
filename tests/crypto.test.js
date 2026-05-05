const request = require("supertest");

const app = require("../app");
const Crypto = require("../models/Crypto");

jest.mock("../models/Crypto");

describe("crypto endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("lists all crypto", async () => {
    Crypto.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([{ name: "Bitcoin" }]),
    });

    const response = await request(app).get("/crypto");

    expect(response.status).toBe(200);
    expect(response.body.data[0].name).toBe("Bitcoin");
  });

  it("lists top gainers", async () => {
    Crypto.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([{ name: "Sol" }]),
    });

    const response = await request(app).get("/crypto/gainers");

    expect(response.status).toBe(200);
    expect(response.body.data[0].name).toBe("Sol");
  });

  it("lists new listings", async () => {
    Crypto.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([{ name: "NewCoin" }]),
    });

    const response = await request(app).get("/crypto/new");

    expect(response.status).toBe(200);
    expect(response.body.data[0].name).toBe("NewCoin");
  });

  it("creates a crypto", async () => {
    Crypto.create.mockResolvedValue({ name: "Ethereum" });

    const response = await request(app).post("/crypto").send({
      name: "Ethereum",
      symbol: "ETH",
      price: 3500,
      image: "https://example.com/eth.png",
      change24h: 2.5,
    });

    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe("Ethereum");
  });

  it("rejects missing fields", async () => {
    const response = await request(app).post("/crypto").send({
      name: "Ethereum",
    });

    expect(response.status).toBe(400);
  });
});
