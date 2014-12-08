var test    = require('tape'),
    onError = require('..')

test('on-error', function (t) {
    function handleIt () {
        var args = Array.prototype.slice.call(arguments, 0)
        errorCalls.push(args)
    }
    function callback () {
        var args = Array.prototype.slice.call(arguments, 0)
        return args
    }
    var errorCalls = []

    t.equal(typeof onError.emit, 'function', '.emit should be a function')
    t.notOk(onError(handleIt, callback)(new Error('error 1')), 'should return undefined on error without alwaysCall')
    t.deepEqual(onError(handleIt, {alwaysCall:true}, callback)(new Error('error 2')), [new Error('error 2')], 'should return args on error with alwaysCall')
    t.deepEqual(onError(handleIt, callback)(null, 1, 2), [1, 2], 'should return args on no error')
    t.notOk(onError(handleIt)(new Error('error 2')), 'should return undefined on error with no cb')
    t.deepEqual(onError(handleIt)(), undefined, 'should return undefined on no error with no cb')
    t.deepEqual(errorCalls.length, 3, 'should have emitted 3 error events')

    t.end()
})
