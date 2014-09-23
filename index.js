var namespace = "resque";


module.exports = function(redis, queue, jobName, args,  cb) {

  if(typeof cb !== "function") {
    throw new Error("Must provide a callback");
  }

  var payload = JSON.stringify({"class": jobName, args: args || []});

  var toHear = 2;

  redis.sadd(key("queues"), queue, heardResponse);
  redis.rpush(key("queue", queue), payload, heardResponse);

  function heardResponse(err) {
    if(err) {
      toHear = -1;
      return cb(err);
    }
    if(--toHear === 0) {
      cb();
    }
  }
};

module.exports.enqueue = module.exports;

module.exports.setNamespace = function(v) {
  namespace = v;
};

function key() {
  return [namespace].concat([].slice.call(arguments)).join(":");
}
