var vue = require( 'vue' );
var xhrJson = require( 'xhr-json' );
var find = require( 'dom-select' );
var remove = require( 'dom-remove' );
var model = require( './model' );


module.exports = docs;

function docs() {}

docs.prototype = {

  init: function( req, done ) {

    xhrJson( '/module/' + req.splats[ 0 ] )
    .then( function( res ) {

      var data = res.body;

      if( data.ok ) {

        var docVue = this.docVue = new vue( {

          el: '#docs-container',
          template: '#docs-template',
          data: data,
          attached: function() {

            var allImageTags = find.all( 'img', this.$el );
            var img;

            for( var i = 0, len = allImageTags.length; i < len; i++ ) {

              img = allImageTags[ i ];
              img.onerror = function() {

                remove( this );
              }.bind( img );
            }

            done();
          }
        });
      } else {

        done();
      }
    }.bind( this ));
  },

  destroy: function( req, done ) {

    console.log( 'destroyed' );
    
    this.docVue.$destroy( true );

    done();
  }
};