module.exports = function( splat ) {

  var pathModule = splat.split( '/' );
  var pathFolder = [];

  if( pathModule[ 0 ] != '' ) {

    for( var i = 0, len = pathModule.length; i < len; i++ ) {

      pathFolder.push( 'node_modules', pathModule[ i ] );
    }  
  } else {

    pathFolder.push( '.' );
  }
  

  pathFolder = pathFolder.join( '/' );

  return pathFolder;
};