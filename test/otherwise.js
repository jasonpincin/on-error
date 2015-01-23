var test    = require('tape'),
    onError = require('..')

test('on-error().otherwise', function (t) {
    var h = function errHandler () {}
    t.equal(typeof onError(h).otherwise, 'function', 'should be a function')
    t.throws(onError(h).otherwise, 'requires a callback')

    test('when passed an error', function (t) {
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
            handler = onError(errHandler).otherwise(otherHandler)
        t.notOk(handler(anError), 'should return undefined')
        t.equal(errorCalls.length, 1, 'should invoke error handler')
        t.equal(otherCalls.length, 0, 'should not invoke otherwise handler')
        t.equal(errorCalls[0][0], anError, 'should pass error to handler')
        t.end()
    })

    test('when passed no error', function (t) {
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
        var handler = onError(errHandler).otherwise(otherHandler)
        t.equal(handler(null, 5, 10), true, 'should return true')
        t.equal(errorCalls.length, 0, 'should not invoke error handler')
        t.equal(otherCalls.length, 1, 'should invoke otherwise handler')
        t.deepEqual(otherCalls[0], [5, 10], 'should pass non-error args to otherwise handler')
        t.end()
    })

    t.end()
})
