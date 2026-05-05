const { connectDB } = require("../config/db");

jest.mock("mongoose", () => ({
  connect: jest.fn(),
  connection: {},
}));

describe("database connection", () => {
  it("throws when MONGODB_URI is missing", async () => {
    await expect(connectDB("")).rejects.toThrow("MONGODB_URI is not set");
  });
});
