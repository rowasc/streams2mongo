#! /usr/bin/node
(function (){
  var pkg = require("../package.json");

  var usageError = function(arguments){
    if (arguments.length<8){
      throw Error("Usage error, read the README.md to see usage");
      return;
    };
  };

  exports.checkParams = checkParams = function(pipedData){
    var mongoConf={
      "host":null,
      "port":null,
      "db":null,
      "collection": null
    };
    var mongoArgs= pipedData.slice(2).map(function(arg){
      return arg.replace("--","").trim();
    });
    usageError(mongoArgs);
    var i =0;
    while(i<mongoArgs.length){
      mongoConf[mongoArgs[i]]=mongoArgs[i+1];
      i=i+2;
    }
    return mongoConf;
  };

  exports.start = start = function(){
    var pipedData=process.argv;
    var mongoConf = checkParams(pipedData);
    mongoConnect(mongoConf);
  };
  var mongoConnect = function(mongoConf){
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://"+mongoConf.host+":"+mongoConf.port+"/"+mongoConf.db, function(err, db) {
      if(err) {
        console.log(mongoConf);
        throw new Error(err);
      }
      var mongoCol=db.collection(mongoConf.collection);
      handleStdIn(function(chunk){
        saveToMongo(cleanChunk(chunk),mongoCol);
      });
    });
  };

  var handleStdIn =function(callbackToSave){
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', function() {
      var chunk = process.stdin.read();
      callbackToSave(chunk);
    });
    stdInEndHandler();
  };

  var stdInEndHandler= function(){
    process.stdin.on('end', function() {
      process.stdout.write('end');
    });
  };

  exports.cleanChunk = cleanChunk = function(chunk){
    chunk = chunk !==null? chunk.split("\n"): [];
    return chunk.map(function(itm){
      var trimmedJSONString= itm.trim().length > 0? itm.trim(): false;
      if (trimmedJSONString===false){
        return false;
      }
      try{
        return JSON.parse(itm);
      }catch(e){console.log(e);return false ;}
    }).filter(function(itm){
      return itm===false?false:itm;
    });
  };

  exports.saveToMongo = saveToMongo= function(chunks,mongoCol){
    try{
      mongoCol.insert(chunks);
    }catch(e){
      return false;
    }
    return true;
  };
}).call(this);