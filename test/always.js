var test         = require('tape'),
    EventEmitter = require('events').EventEmitter,
    onError      = require('..')

test('on-error().always', function (t) {
    var h = function errHandler () {}
    t.equal(typeof onError(h).always, 'function', 'should be a function')
    t.throws(onError(h).always, 'requires a callback')
    t.end()
})

test('on-error().always when passed an error', function (t) {
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
        handler = onError.emit(emitter).always(otherHandler)

    t.equals(handler(anError, 5, 10), true, 'should return true')
    t.equal(emits.length, 1, 'should invoke error handler')
    t.equal(otherCalls.length, 1, 'should invoke always handler')
    t.equal(emits[0], anError, 'should pass error to emitter')
    t.deepEqual(otherCalls[0], [5, 10], 'should pass non-error args to always handler')
    t.end()
})

test('on-error().always when passed no error', function (t) {
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
    var handler = onError.emit(emitter).always(otherHandler)
    t.equals(handler(null, 5, 10), true, 'should return true')
    t.equal(emits.length, 0, 'should not invoke error handler')
    t.equal(otherCalls.length, 1, 'should invoke always handler')
    t.deepEqual(otherCalls[0], [5, 10], 'should pass non-error args to always handler')
    t.end()
})
