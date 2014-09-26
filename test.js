var enqueue = require("./index");
var assert = require("chai").assert;

describe("enqueueing", function() {

  var c = require("redis").createClient();

  before(function(done) {
    c.select(15, function(err) {
      if(err) return done(err);
      c.flushall(done);
    });
  });

  describe("effect", function() {

    before(function(done) {
      enqueue(c, "abnormal", "something", 1, 2, done);
    });

    it("ensures queue is present", function(done) {
      c.smembers("resque:queues", function(err, mems) {
        if(err) done(err);
        assert.deepEqual(mems, ["abnormal"]);
        done();
      });
    });

    it("ensures queue is present", function(done) {
      c.lrange("resque:queue:abnormal", 0, -1, function(err, mems) {
        if(err) done(err);
        assert.equal(mems.length, 1);
        assert.equal(mems[0], '{"class":"something","args":[1,2]}');
        done();
      });
    });
  });

  
  describe("setting namespace", function() {

    before(function(done) {
      enqueue.setNamespace("myresque");
      enqueue(c, "abnormal", "something", 1, 2, done);
    });

    it("ensures queue is present", function(done) {
      c.smembers("myresque:queues", function(err, mems) {
        if(err) done(err);
        assert.deepEqual(mems, ["abnormal"]);
        done();
      });
    });

  });


});
