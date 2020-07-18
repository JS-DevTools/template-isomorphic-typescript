/* eslint-env node, browser */
"use strict";

const { myLibrary } = require("../../");
const { assert, expect } = require("chai");
const { host } = require("@jsdevtools/host-environment");

const location = host.node ? process.cwd() : window.location.href;

describe("myLibrary() API", () => {

  it("should work without any arguments", () => {
    let result = myLibrary();
    expect(result).to.equal(`Hello, world from ${location}.`);
  });

  it("should accept a custom greeting", () => {
    let result = myLibrary({ greeting: "Hi there" });
    expect(result).to.equal(`Hi there, world from ${location}.`);
  });

  it("should accept a custom subject", () => {
    let result = myLibrary({ subject: "Michael" });
    expect(result).to.equal(`Hello, Michael from ${location}.`);
  });

  it("should accept a custom location", () => {
    let result = myLibrary({ location: "New York City" });
    expect(result).to.equal("Hello, world from New York City.");
  });

  it("should accept a custom greeting and subject", () => {
    let result = myLibrary({ greeting: "Yo", subject: "man" });
    expect(result).to.equal(`Yo, man from ${location}.`);
  });

  it("should accept a custom greeting, subject, and location", () => {
    let result = myLibrary({ greeting: "Yo", subject: "man", location: "outer space" });
    expect(result).to.equal("Yo, man from outer space.");
  });

  it("should set the location based on the runtime host", () => {
    let result = myLibrary();

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
      myLibrary({ greeting: "Goodbye" });
      assert.fail("An error should have been thrown!");
    }
    catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal("Cannot say goodbye");
    }
  });

});
