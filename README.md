# resque-enqueue

Enqueues tasks to resque 1.x.x. Does not attempt to do anything else. `redis` should be something like `node-redis` that has `sadd` and `rpush` with a callback API.

```
var enqueue = require("resque-enqueue");

enqueue(redis, "normal", "SendWelcome", ["bob@bob.com"], function(err) {
  if(!err) {
    console.log("mail sent!");
  }
});
```

## API

### `enqueue(redis, queue, className, args, cb)` or `enqueue.enqueue(redis, queue, className, args, cb)`

enqueues a single task to resque.

### `enqueue.setNamespace(namespace)`

sets the namespace, defaults to `resque`.

