var EventEmitter = require('events').EventEmitter,
    onError      = require('..')

// fake something that works
function doSomething (cb) {
    cb(null, 'success')
}

// fake something that breaks
function failToDoSomething (cb) {
    cb(new Error('failed'))
}

// error handler
function handleIt (err) {
    console.error(err)
}

// if error handleIt, otherwise...
doSomething(onError(handleIt).otherwise(function (message) {
    console.log('will see this: %s', message)
}))

failToDoSomething(onError(handleIt).otherwise(function (message) {
    console.log('will NOT see this: %s', message)
}))

// if error handleIt, and also...
failToDoSomething(onError(handleIt).also(function (message) {
    console.log('will see this too: %s', message)
}))

// if error handleIt, and also (include error for also func)...
failToDoSomething(onError(handleIt).alsoWithError(function (err, message) {
    console.log('will see this too (with the error): %s, %s', err, message)
}))

// maybe we want to emit the error instead...
var emitter = new EventEmitter().on('error', console.log)
failToDoSomething(onError.emit(emitter).otherwise(function (message) {
    // will not get here
    console.log(message)
}))
