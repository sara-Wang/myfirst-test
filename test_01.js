var should = require("chai").should();

describe("test a variable", () => {
    let a = "yuz";

    it("a should be a string", () => {
        a.should.be.a("string");
    });

    it("a should equal to yuz", () => {
        a.should.equal("yuz");
    });
});
