var llquantize = require(__dirname + "/..")
  , start = Date.now()
  , llq1 = llquantize(2, 16)
  , llq2 = llquantize(2, 16)

for (var i = 0; i < 1000; i++) {
  llq1(Math.round(Math.random() * 1000))
  llq2(Math.round(Math.random() * 1000))
}

var p1 = llq1()
  , p2 = llq2()

for (var i = 0; i < 500000; i++) {
  if (i % 10000 === 0) console.log(i)
  llquantize.merge([p1, p2])
}

console.log((Date.now() - start) + "ms (smaller is faster)")
