var test    = require('tape'),
    onError = require('..')

test('on-error().otherwiseWithError', function plan (t) {
    var h = function errHandler () {}
    t.equal(typeof onError(h).otherwiseWithError, 'function', 'should be a function')
    t.throws(onError(h).otherwiseWithError, 'requires a callback')
    t.end()
})

test('on-error().otherwiseWithError when passed an error', function plan (t) {
    t.plan(4)
    var errorCalls = [],
        otherCalls = []

    function errHandler () {
        var args = Array.prototype.slice.call(arguments, 0)
        errorCalls.push(args)
    }
    function otherHandler () {
        var args = Array.prototype.slice.call(arguments, 0)
        otherCalls.push(args)
    }
    var anError = new Error('error 1'),
        handler = onError(errHandler).otherwiseWithError(otherHandler)

    t.notOk(handler(anError), 'should return undefined')
    t.equal(errorCalls.length, 1, 'should invoke error handler')
    t.equal(otherCalls.length, 0, 'should not invoke otherwise handler')
    t.equal(errorCalls[0][0], anError, 'should pass error to handler')
})

test('on-error().otherwiseWithError when passed no error', function plan (t) {
    t.plan(4)

    var errorCalls = [],
        otherCalls = []

    function errHandler () {
        var args = Array.prototype.slice.call(arguments, 0)
        errorCalls.push(args)
    }
    function otherHandler () {
        var args = Array.prototype.slice.call(arguments, 0)
        otherCalls.push(args)
        return true
    }
    var handler = onError(errHandler).otherwiseWithError(otherHandler)
    t.equal(handler(null, 5, 10), true, 'should return true')
    t.equal(errorCalls.length, 0, 'should not invoke error handler')
    t.equal(otherCalls.length, 1, 'should invoke otherwise handler')
    t.deepEqual(otherCalls[0], [null, 5, 10], 'should pass all args to otherwise handler')
})

