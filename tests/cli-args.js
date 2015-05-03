var expect, cli;
expect= require('chai').expect
cli = require("../index.js");
var fs=require("fs");
describe("check params for mongo connection", function(){
  this.timeout(3000);
  it("returns the correct mongo config object  when we send the correct params", function (done){
    var checkParamVals = (cli.checkParams(["","","--host", "MONGO_HOST" ,"--port", "MONGO_PORT" ,"--db", "MONGO_DB_NAME", "--collection", "MONGO_COLLECTION"]));
    expect({"host":"MONGO_HOST","port":"MONGO_PORT","db":"MONGO_DB_NAME","collection": "MONGO_COLLECTION"}).to.deep.equal(checkParamVals);
    done();

  });
  it("DOES NOT throw an error if we send mongo data in the call", function (done){
    //var stdin = require('mock-stdin').stdin();
    //console.log("START GOOD PARAMS");
    expect(function(){cli.checkParams(["","","--host", "MONGO_HOST" ,"--port", "MONGO_PORT" ,"--db", "MONGO_DB_NAME", "--collection", "MONGO_COLLECTION"])}).to.not.throw(Error);
    done();
  });

  it("THROWS an error if we send mongo data in the call", function (done){
    //var stdin = require('mock-stdin').stdin();
    //console.log("START GOOD PARAMS");
    expect(function(){cli.checkParams(["","","--host", "MONGO_HOST" ,"--port", "MONGO_PORT" ,"--db", "MONGO_DB_NAME", "--collection"])}).to.throw(Error);
    done();
  });
});
