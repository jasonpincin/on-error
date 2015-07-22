var test         = require('tape'),
    EventEmitter = require('events').EventEmitter,
    onError      = require('..')

test('on-error.emit', function (t) {
    var emitter = new EventEmitter

    t.equal(typeof onError.emit, 'function', 'should be a function')
    t.throws(onError.emit, 'should require an emitter')
    t.ok(typeof onError.emit(emitter) === 'function', 'should return a function')
    t.end()
})

test('on-error.emit when passed an error', function (t) {
    var emitter = new EventEmitter,
    emits   = []
    emitter.on('error', function (err) {
        emits.push(err)
    })
    var anError = new Error('error 1')
    t.notOk(onError.emit(emitter)(anError), 'should return undefined')
    t.equal(emits.length, 1, 'should emit')
    t.equal(emits[0], anError, 'should emit given error')
    t.end()
})

test('on-error.emit when passed no error', function (t) {
    var emitter = new EventEmitter,
    emits   = []
    emitter.on('error', function (err) {
        emits.push(err)
    })
    t.notOk(onError.emit(emitter)(null), 'should return undefined')
    t.equal(emits.length, 0, 'should not emit')
    t.end()
})

