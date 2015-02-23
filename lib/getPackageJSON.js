var fs = require( 'fs' );

module.exports = function( path, done ) {

  path = path || '.';

  var packagePath = path + '/package.json';

  fs.exists( packagePath, function( exists ) {

    if( exists ) {

      fs.readFile( packagePath, 'utf8', function( err, packagejson ) {

        if( err ) {

          done( null );            
        }

        packagejson = JSON.parse( packagejson );

        done( packagejson );
      });
    } else {

      done( null );
    }
  });
};