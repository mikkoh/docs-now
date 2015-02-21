var xhrJson = require( 'xhr-json' );
var promise = require( 'bluebird' );

var tree = new promise( function( ok, err ) {

  xhrJson( './tree' )
  .then( function( res ) {

    ok( res.body );
  });
});



module.exports = tree;