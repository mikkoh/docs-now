var findModules = require( 'find-modules' );
var fs = require( 'fs' );

module.exports = function( done ) {

  findModules( process.cwd(), function( err, modules ) {

    var tree = {

      moduleName: null,
      modules: {}
    };

    // read in dependencies
    modules.forEach( function( module ) {

      var path = module.split( 'node_modules/' );
      var treePart = tree.modules;

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

    // update modulename of package.json exists
    fs.exists( 'package.json', function( exists ) {

      if( exists ) {

        fs.readFile( 'package.json', 'utf8', function( err, packagejson ) {

          if( err ) {

            done( tree );            
          }

          packagejson = JSON.parse( packagejson );

          tree.moduleName = packagejson.name;

          done( tree );
        });
      } else {

        done( tree );
      }
    });
  });
};