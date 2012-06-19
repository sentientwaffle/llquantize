# llquantize - Log/linear quantization

[![Build Status](https://secure.travis-ci.org/sentientwaffle/llquantize.png?branch=master)](http://travis-ci.org/sentientwaffle/llquantize)

For more information on log/linear quantization, see
[this blog post](http://dtrace.org/blogs/bmc/2011/02/08/llquantize/).

To summarize: log/linear quantization addresses the problem of
using the wrong aggregation resolution, which leads to
"clogging the system with unnecessarily fine-grained data,
or discarding valuable information in overly coarse-grained data".

It does this by logarithmically aggregating by order of magnitude,
but linearly aggregating within an order of magnitude.

# Example

    var llquantize = require('llquantize')
      , llq = llquantize()

    // Input some data points.
    llq(0.54); llq(0.55)
    llq(2);    llq(3)
    llq(12);   llq(14)
    llq(24)
    llq(124);  llq(199)

    // Get the accumulated data.
    llq()
    // =>
    // { "0.5": 2
    // , "2":   1
    // , "3":   1
    // , "10":  2
    // , "20":  1
    // , "100": 2
    // }

As you can see, the closer to zero the data points approach, the greater the
precision used to track/group them (and vice-versa).

# API
## llquantize([bucket_size=10, [steps=10]])

Arguments:

  * `bucket_size` - The factor by which the bucket size should increase.
    (i.e. the first bucket will have the size `bucket_size`, the next will
    be `bucket_size^2`...)
  * `steps` - The number of divisions per bucket,

# Installation

    $ npm install llquantize

# License

MIT

