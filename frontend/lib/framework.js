var bigwheel = require( 'bigwheel' );

module.exports = bigwheel( function( done ) {

  done( {

    routes: {

      '/': require( './menu' ),
      '/*': { section: [ require( './menu' ), require( './docs' ) ], duplicate: true }
    }
  });
});