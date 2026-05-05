const Crypto = require("../models/Crypto");
const User = require("../models/User");

describe("User model", () => {
  it("requires name, email, and password", () => {
    const user = new User({});
    const error = user.validateSync();

    expect(error).toBeTruthy();
    expect(error.errors.name).toBeTruthy();
    expect(error.errors.email).toBeTruthy();
    expect(error.errors.password).toBeTruthy();
  });

  it("marks email as unique", () => {
    const emailOptions = User.schema.path("email").options;

    expect(emailOptions.unique).toBe(true);
  });
});

describe("Crypto model", () => {
  it("requires basic crypto fields", () => {
    const crypto = new Crypto({});
    const error = crypto.validateSync();

    expect(error).toBeTruthy();
    expect(error.errors.name).toBeTruthy();
    expect(error.errors.symbol).toBeTruthy();
    expect(error.errors.price).toBeTruthy();
    expect(error.errors.image).toBeTruthy();
    expect(error.errors.change24h).toBeTruthy();
  });
});
