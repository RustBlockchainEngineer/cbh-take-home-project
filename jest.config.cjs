/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {
  verbose: true,
  forceExit: true,

  maxWorkers: 1,

  testMatch: ["<rootDir>/**/*.test.js"],

  testTimeout: 100_000,
  slowTestThreshold: 5_000,

  fakeTimers: {
    doNotFake: ["nextTick"],
    timerLimit: 5_000,
  },
};
