var test         = require('tape'),
    EventEmitter = require('events').EventEmitter,
    onError      = require('..')

test('on-error().alwaysWithError', function (t) {
    var h = function errHandler () {}
    t.equal(typeof onError(h).alwaysWithError, 'function', 'should be a function')
    t.throws(onError(h).alwaysWithError, 'requires a callback')
    t.end()
})

test('on-error().alwaysWithError when passed an error', function (t) {
    var emitter    = new EventEmitter,
    emits      = [],
    otherCalls = []
    emitter.on('error', function (err) {
        emits.push(err)
    })
    function otherHandler () {
        var args = Array.prototype.slice.call(arguments, 0)
        otherCalls.push(args)
        return true
    }
    var anError = new Error('error 1'),
    handler = onError.emit(emitter).alwaysWithError(otherHandler)
    t.equals(handler(anError, 5, 10), true, 'should return true')
    t.equal(emits.length, 1, 'should invoke error handler')
    t.equal(otherCalls.length, 1, 'should invoke always handler')
    t.equal(emits[0], anError, 'should pass error to emitter')
    t.deepEqual(otherCalls[0], [anError, 5, 10], 'should pass all args to always handler')
    t.end()
})

test('on-error().alwaysWithError when passed no error', function (t) {
    var emitter    = new EventEmitter,
    emits      = [],
    otherCalls = []
    emitter.on('error', function (err) {
        emits.push(err)
    })
    function otherHandler () {
        var args = Array.prototype.slice.call(arguments, 0)
        otherCalls.push(args)
        return true
    }
    var handler = onError.emit(emitter).alwaysWithError(otherHandler)
    t.equals(handler(null, 5, 10), true, 'should return true')
    t.equal(emits.length, 0, 'should not invoke error handler')
    t.equal(otherCalls.length, 1, 'should invoke always handler')
    t.deepEqual(otherCalls[0], [null, 5, 10], 'should pass all args to always handler')
    t.end()
})

