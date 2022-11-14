const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns stringified literal of object when event.partitionKey is not string and length of JSON.stringify() <= 256", () => {
    const key = crypto.randomBytes(30).toString("hex");
    const event = {partitionKey: {key}};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("{\"key\":\""+key+"\"}");
  });
  it("Returns the literal of small length than 256 when event.partitionKey is not string and length of JSON.stringify() > 256", () => {
    const key = crypto.randomBytes(300).toString("hex");
    const event = {partitionKey: {key}};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey.length <= 256).toBe(true);
  });
  it("Returns given event.partitionKey when event.partitionKey is string and length of event.partitionKey <= 256", () => {
    const partitionKey = crypto.randomBytes(100).toString("hex");
    const event = {partitionKey};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(partitionKey);
  });
  it("Returns the literal of small length than 256 when event.partitionKey is string and length of event.partitionKey > 256", () => {
    const partitionKey = crypto.randomBytes(300).toString("hex");
    const event = {partitionKey};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey.length <= 256).toBe(true);
  });
  it("When event.partitionKey is undefined and event is empty object", () => {
    const event = {};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex"));
  });
  it("When event.partitionKey is undefined and event is big object", () => {
    const event = {key: crypto.randomBytes(300).toString("hex")};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex"));
  });
});
