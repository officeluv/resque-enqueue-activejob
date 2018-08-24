var namespace = "resque";


module.exports = function(redis, queue, jobName) {

  var args = [].slice.call(arguments, 3, -1);
  var cb = arguments[arguments.length - 1];

  if(typeof cb !== "function") {
    throw new Error("Must provide a callback");
  }

  var payload = JSON.stringify({
      "class": "ActiveJob::QueueAdapters::ResqueAdapter::JobWrapper",
      args: {
          job_class: jobName,
          queue_name: queue,
          "arguments": args
      }
  });

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
