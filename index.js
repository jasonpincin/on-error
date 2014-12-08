module.exports = function onError (errHandler, options, cb) {
    if (arguments.length === 2)
        cb = options, options = {}

    return function () {
        if (arguments[0])
            errHandler(arguments[0])
        if (!cb) return
        if (options.alwaysCall)
            return cb.apply(cb, arguments)
        if (arguments[0]) return
        return cb.apply(cb, Array.prototype.slice.call(arguments, 1))
    }
}
