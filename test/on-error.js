var test    = require('tape'),
    onError = require('..')

test('on-error', function (t) {

    t.equal(typeof onError, 'function', 'should be a function')
    t.throws(onError, 'requires a callback')

    test('when passed an error', function (t) {
        var errorCalls = []
        function errHandler () {
            var args = Array.prototype.slice.call(arguments, 0)
            errorCalls.push(args)
        }
        var anError = new Error('error 1')
        t.notOk(onError(errHandler)(anError), 'should return undefined')
        t.equal(errorCalls.length, 1, 'should invoke error handler')
        t.equal(errorCalls[0][0], anError, 'should pass error to handler')
        t.end()
    })

    test('when passed no error', function (t) {
        var errorCalls = []
        function errHandler () {
            var args = Array.prototype.slice.call(arguments, 0)
            errorCalls.push(args)
        }
        t.notOk(onError(errHandler)(null), 'should return undefined')
        t.equal(errorCalls.length, 0, 'should not invoke error handler')
        t.end()
    })

    t.end()
})
