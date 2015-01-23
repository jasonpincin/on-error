var assert = require('assert')

module.exports = onError

function onError (errCb) {
    assert(typeof errCb === 'function', 'on-error requires a callback')

    function errHandler () {
        if (arguments[0]) errCb.call(this, arguments[0])
    }
    return decorated(errHandler)
}
onError.emit = function (emitter) {
    assert(typeof emitter.emit === 'function', 'on-error.emit requires an EventEmitter')

    function errHandler () {
        if (arguments[0]) emitter.emit('error', arguments[0])
    }
    return decorated(errHandler)
}

function decorated (errHandler) {
    errHandler.otherwise = function (otherwiseCb) {
        assert(typeof otherwiseCb === 'function', 'on-error.otherwise requires a callback')

        return function otherwiseHandler () {
            if (arguments[0]) return errHandler(arguments[0])
            return otherwiseCb.apply(this, Array.prototype.slice.call(arguments, 1))
        }
    }
    errHandler.always = function (alwaysCb) {
        assert(typeof alwaysCb === 'function', 'on-error.always requires a callback')

        return function alwaysHandler () {
            if (arguments[0]) errHandler(arguments[0])
            return alwaysCb.apply(this, Array.prototype.slice.call(arguments, 1))
        }
    }
    errHandler.alwaysWithError = function (alwaysCb) {
        assert(typeof alwaysCb === 'function', 'on-error.alwaysWithError requires a callback')

        return function alwaysHandler () {
            if (arguments[0]) errHandler(arguments[0])
            return alwaysCb.apply(this, arguments)
        }
    }
    return errHandler
}
