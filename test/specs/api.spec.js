"use strict";

const { projectExportName } = require("../../");
const { assert, expect } = require("chai");
const { host } = require("@jsdevtools/host-environment");

const location = host.node ? process.cwd() : window.location.href;

describe("projectExportName() API", () => {

  it("should work without any arguments", () => {
    let result = projectExportName();
    expect(result).to.equal(`Hello, world from ${location}.`);
  });

  it("should accept a custom greeting", () => {
    let result = projectExportName({ greeting: "Hi there" });
    expect(result).to.equal(`Hi there, world from ${location}.`);
  });

  it("should accept a custom subject", () => {
    let result = projectExportName({ subject: "Michael" });
    expect(result).to.equal(`Hello, Michael from ${location}.`);
  });

  it("should accept a custom location", () => {
    let result = projectExportName({ location: "New York City" });
    expect(result).to.equal("Hello, world from New York City.");
  });

  it("should accept a custom greeting and subject", () => {
    let result = projectExportName({ greeting: "Yo", subject: "man" });
    expect(result).to.equal(`Yo, man from ${location}.`);
  });

  it("should accept a custom greeting, subject, and location", () => {
    let result = projectExportName({ greeting: "Yo", subject: "man", location: "outer space" });
    expect(result).to.equal("Yo, man from outer space.");
  });

  it("should set the location based on the runtime host", () => {
    let result = projectExportName();

    if (host.browser) {
      expect(result).to.match(/^Hello, world from http:\/\/localhost/);
    }
    else if (host.os.windows) {
      expect(result).to.match(/^Hello, world from [A-Z]:\\/);
    }
    else {
      expect(result).to.match(/^Hello, world from \//);
    }
  });

  it('should not allow a greeting of "goodbye"', () => {
    try {
      projectExportName({ greeting: "Goodbye" });
      assert.fail("An error should have been thrown!");
    }
    catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal("Cannot say goodbye");
    }
  });

});
