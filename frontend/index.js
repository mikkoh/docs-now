var framework = require( './lib/framework' );
var tree = require( './lib/tree' );
var model = require( './lib/model' );


tree.then( function( data ) {

  model.menu.tree = model.menu.treePart = data;

  framework.init();
});