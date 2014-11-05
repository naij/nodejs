var Readable = require('stream').Readable;
var util = require('util');

function CountingObjectStream(length, options) {
  if (!(this instanceof CountingObjectStream)) {
    return new CountingObjectStream(length, options);
  }
  if (!options) options = {}; // ensure object
  options.objectMode = true; // forcing object mode
  Readable.call(this, options);
  this.lenToCount = length;  // how far to count
  this.index = 0;  // to track our count
}
util.inherits(CountingObjectStream, Readable);

CountingObjectStream.prototype._read = function () {
  this.index += 1;
  if (this.index > this.lenToCount) {
    return this.push(null); // done, return
  }

  // pushing number, but could be any non-null obj
  this.push({index:this.index});
};


// consume this stream and output to stdout
// coercing it to a string
var readStream = new CountingObjectStream(10);
readStream
  .on('readable', function () {
    var obj;
    while (null !== (obj = readStream.read())) {
      console.log(typeof obj);
    }
  });