# on-error

[![NPM version](https://badge.fury.io/js/on-error.png)](http://badge.fury.io/js/on-error)
[![Build Status](https://travis-ci.org/jasonpincin/on-error.svg?branch=master)](https://travis-ci.org/jasonpincin/on-error)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/on-error/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/on-error?branch=master)
[![Davis Dependency Status](https://david-dm.org/jasonpincin/on-error.png)](https://david-dm.org/jasonpincin/on-error)

Handle callback errors without the `if` blocks. 

On error, execute separate error handler function, or emit it. On no error, execute regular callback  
(with or without error stripped).

## example

```javascript
// if error handleIt, otherwise...
doSomething(onError(handleIt).otherwise(function (message) {
    console.log('will see this: %s', message)
}))

failToDoSomething(onError(handleIt).otherwise(function (message) {
    console.log('will NOT see this: %s', message)
}))

// if error handleIt, and always...
failToDoSomething(onError(handleIt).always(function (message) {
    console.log('will see this too: %s', message)
}))

// if error handleIt, and always (include error for always func)...
failToDoSomething(onError(handleIt).alwaysWithError(function (err, message) {
    console.log('will see this too (with the error): %s, %s', err, message)
}))

// maybe we want to emit the error instead...
var emitter = new EventEmitter().on('error', console.log)
failToDoSomething(onError.emit(emitter).otherwise(function (message) {
    // will not get here
}))
```

## api

```javascript
var onError = require('on-error')
```

### onError(cb)

Returns a function that when called with a truthy first argument, will execute `cb` with said 
argument.

### onError.emit(emitter)

Returns a function that when called with a truthy first argument, will emit `error` on the provided
event `emitter` with said argument.

### onError(cb1).otherwise(cb2)

Returns a function that when called with a truthy first argument, will execute `cb1` with said 
argument. When executed with a non-truthy 1st argument, `cb2` will instead be executed with 
the error argument stripped.

`.otherwise` may always be chained from `onError.emit()`

### onError(cb1).always(cb2)

Returns a function that when called with a truthy first argument, will execute `cb1` with said 
argument. In addition, `cb2` will always be executed with the error argument stripped.

`.always` may always be chained from `onError.emit()`

### onError(cb1).alwaysWithError(cb2)

Returns a function that when called with a truthy first argument, will execute `cb1` with said 
argument. In addition, `cb2` will always be executed with the error argument in-tact.

`.alwaysWithError` may always be chained from `onError.emit()`

## testing

`npm test [--dot | --spec] [--coverage]`

Alternatively, only run test files matching a certain pattern by prefixing the command 
with `grep=pattern`. Example: `grep=init npm test`

Open an html coverage report after running tests with `npm run view-cover` or `npm run vc`
