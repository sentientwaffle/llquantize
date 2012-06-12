var path = require('path')
  , llquantize = require(path.resolve(__dirname, '../'))
  , test = require('tap').test


test("general usage", test_llq(
    [ 1, 4, 4, 4
    , 10, 12
    , 24, 65
    , 124, 132 ]
  , { 1: 1, 4: 3
    , 10: 2
    , 20: 1, 60: 1
    , 100: 2
    }))

test("zero", test_llq([0, 0, 4], {0: 2, 4: 1}))

test("log-linear quantizes sub-1 numbers", test_llq(
    [ 4
    , 0.54, 0.61
    , 0.0243, 0.0224, 0.032 ]
  , { 4: 1
    , "0.5": 1, "0.6": 1
    , "0.02": 2, "0.03": 1
    }))

test("example from README.md", test_llq(
    [ 0.54, 0.55
    , 2, 3
    , 12, 14, 24
    , 124, 199 ]
  , { "0.5": 2
    , 2: 1, 3: 1
    , 10: 2, 20: 1
    , 100: 2
    }))

test("alternate bucket size", test_llq(
    [ 4, 4, 6, 7, 8
    , 26, 32 ]
  , {4: 2, 5: 3, 25: 2}
  , 5))


function test_llq(input, expect, base) {
  return function(t) {
    var llq = llquantize(base), data
    input.forEach(llq)
    data = llq()

    t.equal(Object.keys(data).length, Object.keys(expect).length)
    t.deepEqual(data, expect)
    t.end()
  }
}
