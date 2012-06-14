var llquantize = require(__dirname + "/..")

function bench(f) {
  var llq = f()
    , start = +Date.now()

  for (var i = 0; i < 10000000; i++) {
    llq(Math.round(Math.random() * 100000))
  }

  return +Date.now() - start
}

console.log(bench(llquantize), "ms (smaller is faster)")

