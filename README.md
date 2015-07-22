# on-error

[![NPM version](https://badge.fury.io/js/on-error.png)](http://badge.fury.io/js/on-error)
[![Build Status](https://travis-ci.org/jasonpincin/on-error.svg?branch=master)](https://travis-ci.org/jasonpincin/on-error)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/on-error/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/on-error?branch=master)
[![Davis Dependency Status](https://david-dm.org/jasonpincin/on-error.png)](https://david-dm.org/jasonpincin/on-error)

Generate error-first callback handlers naturally. 

Handle errors via a dedicated error handler function, or by emitting them. 
Optionally invoke a 2nd function on no error, or regardless of error.

Potentially reduce the number of branches needing tests.

## examples

```javascript
var onError = require('on-error')

// error handler
function handleIt (err) {}

// just do something on error
failToDoSomething(onError(handleIt))
// or emit it
failToDoSomething(onError.emit(emitter))

// if doSomething invokes this generated callback with an error
// handleIt will be called with that error, otherwise our 
// anonymous function will be called with all remaining arguments
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

// or, *gasp*, chain to a promise
doSomething(onError(reject).otherwise(resolve))
```

## api

```javascript
var onError = require('on-error')
```

### onError(cb)

Returns a function that when called with a truthy first argument, will execute `cb` with said argument.

### onError.emit(emitter)

Returns a function that when called with a truthy first argument, will emit `error` on the provided event `emitter` with said argument.

### onError(cb1).otherwise(cb2)

Returns a function that when called with a truthy first argument, will execute `cb1` with said argument. When executed with a non-truthy 1st argument, `cb2` will instead be executed with the error argument stripped.

`.otherwise` may also be chained from `onError.emit()`

### onError(cb1).otherwiseWithError(cb2)

Returns a function that when called with a truthy first argument, will execute `cb1` with said argument. When executed with a non-truthy 1st argument, `cb2` will instead be executed with the error argument in-tact.

`.otherwiseWithError` may also be chained from `onError.emit()`

### onError(cb1).always(cb2)

Returns a function that when called with a truthy first argument, will execute `cb1` with said argument. In addition, `cb2` will always be executed with the error argument stripped.

`.always` may also be chained from `onError.emit()`

### onError(cb1).alwaysWithError(cb2)

Returns a function that when called with a truthy first argument, will execute `cb1` with said argument. In addition, `cb2` will always be executed with the error argument in-tact.

`.alwaysWithError` may also be chained from `onError.emit()`

## testing

`npm test [--dot | --spec] [--grep=pattern]`

Specifying `--dot` or `--spec` will change the output from the default TAP style. 
Specifying `--grep` will only run the test files that match the given pattern.

## coverage

`npm run coverage [--html]`

This will output a textual coverage report. Including `--html` will also open an HTML coverage report in the default browser.
