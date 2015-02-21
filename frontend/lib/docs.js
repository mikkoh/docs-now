var vue = require( 'vue' );
var model = require( './model' );
var xhrJson = require( 'xhr-json' );

module.exports = docs;

function docs() {}

docs.prototype = {

  init: function( req, done ) {

    var docVue = this.docVue = new vue( {

      el: '#docs-container',
      template: '#docs-template',
      ready: done
    });

    xhrJson( '/module/' + req.splats[ 0 ] )
    .then( function( res ) {

      var data = res.body;

      if( data.ok ) {

        docVue.$data = data;
      } else {

        done();
      }
    });
  },

  destroy: function( req, done ) {

    console.log( 'destroyed' );
    
    this.docVue.$destroy( true );

    done();
  }
};