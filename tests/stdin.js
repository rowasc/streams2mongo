var expect, cli;
expect= require('chai').expect
cli = require("../index.js");
var fs=require("fs");
/**
 * Not really working since I don't know how to fix the test to work with stdin / stdout correctly
 *
describe("TEST NOT IMPLEMENTED", function(){
  this.timeout(3000);
  it("@TODO Should read from stdin and return the same input", function (done){
    cli.handleStdIn(function(data){
      done();
    });
  });
});
*/