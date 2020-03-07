"use strict";

const commonJSExport = require("../../");
const { default: defaultExport, projectExportName: namedExport } = require("../../");
const { expect } = require("chai");
const { host } = require("@jsdevtools/host-environment");

describe("project-package-name package exports", () => {

  it("should export the projectExportName() function as the default CommonJS export", () => {
    if (host.node) {
      expect(commonJSExport).to.be.a("function");
      expect(commonJSExport.name).to.equal("projectExportName");
    }
    else {
      // Browser tests are only ESM, not CommonJS
      expect(commonJSExport).to.be.a("Module").with.keys("default", "projectExportName");
    }
  });

  it("should export the projectExportName() function as the default ESM export", () => {
    expect(defaultExport).to.be.a("function");
    expect(defaultExport.name).to.equal("projectExportName");
  });

  it("should export the projectExportName() function as a named export", () => {
    expect(namedExport).to.be.a("function");
    expect(namedExport.name).to.equal("projectExportName");
  });

  it("should not export anything else", () => {
    expect(commonJSExport).to.have.same.keys(
      "default",
      "projectExportName",
    );
  });

});
