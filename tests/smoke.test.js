const request = require("supertest");

describe("test setup", () => {
  it("loads supertest", () => {
    expect(typeof request).toBe("function");
  });
});
