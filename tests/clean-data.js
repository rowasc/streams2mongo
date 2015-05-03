  var expect, cli;
  expect= require('chai').expect
  cli = require("../index.js");
  var fs=require("fs");
  describe("Clean chunks", function(){
    this.timeout(1500);
    it("Should produce an array of objects from a string", function (done){
      var json_test_data_json_pipe = require("./test_data_saving/test_data_json_pipe.json");
      var fileData=fs.readFileSync(__dirname+'/test_data_saving/test_data_json_pipe','utf8');
      var cleanedChunk = cli.cleanChunk(fileData);
      expect(cleanedChunk.length).to.equal(json_test_data_json_pipe.length);
      expect(cleanedChunk).to.deep.equal(json_test_data_json_pipe);
      done();
    });
    it("Should produce an empty array if the string has no valid json", function (done){
        //var stdin = require('mock-stdin').stdin();
        //console.log("START GOOD PARAMS");
        var fileData=fs.readFileSync(__dirname+'/test_data_saving/test_data_json_pipe_invalid','utf8');
        var cleanedChunk = cli.cleanChunk(fileData);
        expect(cleanedChunk.length).to.equal(0);
        done();

    });
  });
