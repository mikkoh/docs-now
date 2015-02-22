var bigwheel = require( 'bigwheel' );

module.exports = bigwheel( function( done ) {

  done( {

    routes: {

      '/*': { section: [ require( './menu' ), require( './docs' ) ], duplicate: true }
    }
  });
});