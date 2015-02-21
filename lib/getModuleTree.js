var findModules = require( 'find-modules' );

module.exports = function( done ) {

  findModules( process.cwd(), function( err, modules ) {

    var tree = {};

    modules.forEach( function( module ) {

      var path = module.split( 'node_modules/' );
      var treePart = tree;

      // remove the base of the path (cwd)
      path.shift();

      if( path[ path.length - 1 ] != '.bin' ) {

        path.forEach( function( part ) {

          // this is not a part
          if( part.indexOf( '/' ) > 0 ) {

            part = part.split( '/' ).join( '' );

            treePart[ part ] = treePart[ part ] || {};

            treePart = treePart[ part ];
          } else {

            treePart[ part ] = {};
          }
        });
      }
    });

    done( tree );
  });
};