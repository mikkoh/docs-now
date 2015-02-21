var browserify = require( 'browserify' );
var fs = require( 'fs' );

module.exports = function( done ) {

  var b = browserify( [ __dirname + '/../frontend/index.js' ] );

  var out = fs.createWriteStream( __dirname + '/../frontend/bundle.js' );

  b.bundle()
  .on( 'end', done )
  .pipe( out );
};