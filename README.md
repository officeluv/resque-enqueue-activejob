# resque-enqueue-activejob

![Build status](https://travis-ci.org/officeluv/resque-enqueue-activejob.svg)

Enqueues tasks to resque 1.x.x, specifically for the `ActiveJob` wrapper. Does not attempt to do anything else. `redis` should be something like `node-redis` that has `sadd` and `rpush` with a callback API.

Based on the original package for bare resque: [resque-enqueue](https://github.com/timruffles/resque-enqueue).

```js
var enqueue = require('resque-enqueue-activejob');

enqueue(redis, 'normal', 'SendWelcome', 'bob@bob.com', function(err) {
  if(!err) {
    console.log("mail sent!");
  }
});
```

## API

### Enqueue

```js
enqueue(redis, queue, className, args..., cb)
// or
enqueue.enqueue(redis, queue, className, args..., cb)
```

Enqueues a single task to resque.

### Set Namespace

```js
enqueue.setNamespace(namespace)
```

Sets the namespace, defaults to `resque`.
