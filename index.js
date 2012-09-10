/*

Log-linear quantization.

Example: (bucket size = 10, steps = 10)

  0         (not a range)
         ...
  0.01-0.1  (delta: 0.01)
  0.1-1     (delta: 0.1)
  1-10      (delta: 1)
  10-100    (delta: 10)
  100-1000  (delta: 100)
         ...

Example: (bucket size = 10, steps = 20)

  0         (not a range)
         ...
  1-10      (delta: 0.5)
  10-100    (delta: 5)
  100-1000  (delta: 50)
         ...

*/
module.exports = function(bucket_size, steps) {
  bucket_size || (bucket_size = 10)
  steps || (steps = 10)
  var buckets = {}
    , log_bucket_size = Math.log(bucket_size)
    , step_ratio = steps - (steps / bucket_size)

  function llquantize(point) {
    if (point === 0) return 0
    // Log(point) base bucket_size
    var log_level = Math.log(point) / log_bucket_size
      , level = Math.pow(bucket_size, Math.floor(log_level))
      , next_level = level * bucket_size
      , step_size = (next_level - level) / step_ratio
      , size = level + step_size * Math.floor((point - level) / step_size)

    // Prevent nasty floating point keys
    // (e.g. instead of 0.600000000001, use 0.6).
    var fixed = size < 1
              ? size.toFixed(Math.round(-1 * Math.log(level) / log_bucket_size))
              : size

    return fixed
  }

  return function(point) {
    if (typeof point === "undefined") {
      return buckets
    } else {
      var bucket = llquantize(point)

      // Increment frequencies.
      if (buckets[bucket]) {
        buckets[bucket]++
      } else {
        buckets[bucket] = 1
      }
    }
  }
}

// Examples:
//
//   llquantize.merge([{"10": 2, "5": 3}, {"10": 6, "3": 1}])
//   // => {"10": 8, "5": 3, "3": 1}
//
// Returns Object.
module.exports.merge = function(buckets) {
  var obj = {}

  buckets.forEach(function(bucket) {
    var k
    for (k in bucket) {
      if (obj[k]) {
        obj[k] += bucket[k]
      } else {
        obj[k] = bucket[k]
      }
    }
  })

  return obj
}
