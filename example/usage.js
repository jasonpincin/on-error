var onError = require('..')

function fail (cb) {
    cb(new Error('failed'))
}

function succeed (cb) {
    cb(null, 'success')
}

function handleIt (err) {
    console.error(err)
}

fail(onError(handleIt, function (status) {
    console.log('will not see this')
}))

fail(onError(handleIt, {alwaysCall: true}, function (err, status) {
    // When always call specified, err is passed
    console.log('will see this')
}))

succeed(onError(handleIt, function (status) {
    // Gets called with status of success
    console.log(status)
}))
