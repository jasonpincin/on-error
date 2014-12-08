# on-error

[![Build Status](https://travis-ci.org/jasonpincin/on-error.svg?branch=master)](https://travis-ci.org/jasonpincin/on-error)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/on-error/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/on-error?branch=master)
[![NPM version](https://badge.fury.io/js/on-error.png)](http://badge.fury.io/js/on-error)
[![Davis Dependency Status](https://david-dm.org/jasonpincin/on-error.png)](https://david-dm.org/jasonpincin/on-error)

Handle callback errors by executing an error handler function, or emitting the error, instead of or in 
addition to executing the callback.

## example

```
var onError = require('on-error')

function fail (cb) {
    cb(new Error('failed'))
}

function succeed (cb) {
    cb(null, 'success')
}
```

Using error handler function:
```
function handleIt (err) {
    console.error(err)
}

fail(onError(handleIt, function (status) {
    console.log('will not see this')
}))

fail(onError(handleIt, {alwaysCall: true}, function (err, status) {
    // When always call specified, err is passed
    console.log('will see this')
}))

succeed(onError(handleIt, function (status) {
    // Gets called with status of success
    console.log(status)
}))
```

Using emitter:
```
var EventEmitter = require('events').EventEmitter
var emitter = new EventEmitter().on('error', function (err) {
    console.error(err)
})

fail(onError.emit(emitter, function (status) {
    console.log('will not see this')
}))
```

## api

### onError

`var onError = require('on-error')`

### var wrappedCb = onError(errHandler [, options, cb])

Returns a function that when called with a truthy first argument, will execute the errHandler
with the 1st (error) argument supplied to the wrappedCb. If the option `alwaysCall` is define, 
the provided `cb` will be executed in all cases with all arguments supplied to `wrappedCb`, otherwise 
if the 1st argument to `wrappedCb` is falsey, the supplied `cb` will be executed with all but the 
1st argument supplied to `wrappedCb`.

If no callback `cb` is provided, then the generated callback will simply execute `errHandler` when 
called with a non-falsey 1st argument.

*options:*
- alwaysCall: `true` or `false` - if true, the provided callback `cb` will always be called (and include 
  the 1st argument), otherwise it will only be called when a the first argument is falsey (and without the 
  1st argument)

### var wrappedCb = onError.emit(emitter [, options, cb])

Same behaviour as above, except errors will be emitted to `emitter` instead of passed to an error handler 
function. All other options and arguments are the same.


## testing

`npm test [--dot | --spec] [--coverage]`

### options

* `--dot` - output test results as dots instead of tap
* `--spec` - output test results as spec instead of tap
* `--coverage` - display text cover report
* `--testling` - run tests in browser via testling (cannot be used with --coverage and 
  expects both browserify and testling to be installed globally)
  

### patterns

Only run test files matching a certain pattern by prefixing the 
test command with `grep=pattern`. Example:

```
grep=connect npm test --dot
```

### html coverage report

Open it with `npm run view-cover` or `npm run vc`
