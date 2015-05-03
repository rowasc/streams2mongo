var expect, cli;
expect= require('chai').expect
cli = require("../index.js");
var fs=require("fs");
describe("Save to mongodb", function(){
  this.timeout(1500);
  var MongoClient = require('mongodb').MongoClient;
  var mongoConf ={host: "localhost" ,port:"3001" ,db: "meteor-tests",collection:"twits"};
  var mongoCount =0;
  var collectionToSave  = [{"a":"n"},{"b":"C"},{"OEOE":"e"}];

  MongoClient.connect("mongodb://"+mongoConf.host+":"+mongoConf.port+"/"+mongoConf.db, function(err, db) {
    var mongoCol=db.collection(mongoConf.collection);
    var count=mongoCol.find({}).count(function(e,count){
      mongoCount=count;
    });
  });

  it("Should receive an array of objects and save it to mongodb", function (done){
    MongoClient.connect("mongodb://"+mongoConf.host+":"+mongoConf.port+"/"+mongoConf.db, function(err, db) {
      var mongoCol=db.collection(mongoConf.collection);
      expect(cli.saveToMongo(collectionToSave, mongoCol)).to.equal(true);
      done();
    });

  });
  it("Should receive an empty array and return false", function (done){
    MongoClient.connect("mongodb://"+mongoConf.host+":"+mongoConf.port+"/"+mongoConf.db, function(err, db) {
      var mongoCol=db.collection(mongoConf.collection);
      expect(cli.saveToMongo([], mongoCol)).to.equal(false);
      done();
    });
  });

  it("Should retrieve the objects in the mongo-db collection, and the count should be equal to mongoCount+2", function(done){
    MongoClient.connect("mongodb://"+mongoConf.host+":"+mongoConf.port+"/"+mongoConf.db, function(err, db) {
      var mongoCol=db.collection(mongoConf.collection);
      var count=mongoCol.find({}).count(function(e,count){
        expect(mongoCount+collectionToSave.length).to.equal(count);
        done();
      });
    });
  });
});
