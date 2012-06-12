# llquantize - Log/linear quantization

For more information on log/linear quantization, see
[this blog post](http://dtrace.org/blogs/bmc/2011/02/08/llquantize/).

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
## llquantize([bucket_size=10])


# Installation

    $ npm install llquantize

# License

MIT

