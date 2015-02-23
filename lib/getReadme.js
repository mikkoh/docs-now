var fs = require( 'fs' );
var path = require( 'path' );
var getFolderPathFromSplat = require( './getFolderPathFromSplat' );


module.exports = function( pathFolder, done ) {

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