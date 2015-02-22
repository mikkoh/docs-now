var fs = require( 'fs' );
var path = require( 'path' );


module.exports = function( params, done ) {

  var pathModule = params[ 0 ].split( '/' );
  var pathFolder = [];
  var readMePath = null;

  if( pathModule[ 0 ] != '' ) {

    for( var i = 0, len = pathModule.length; i < len; i++ ) {

      pathFolder.push( 'node_modules', pathModule[ i ] );
    }  
  } else {

    pathFolder.push( '.' );
  }
  

  pathFolder = pathFolder.join( '/' );

  fs.readdir( pathFolder, function( err, files ) {

    files.forEach( function( file ) {

      if( /^readme/i.test( file ) ) {

        readMePath = path.join( pathFolder, file );

        fs.readFile( readMePath, 'utf8', function( err, markdown ) {

          done( markdown );
        }); 
      }
    });

    // couldn't find readme
    if( !readMePath ) {

      done( null );
    }
  });
};