var vue = require( 'vue' );
var Tween = require( 'gsap' );
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

        var containerDoc = find( '#docs-container' );
        var container = this.container = document.createElement( 'div' );

        container.className = 'container';

        containerDoc.appendChild( container );

        var docVue = this.docVue = new vue( {

          el: container,
          template: '#docs-template',
          data: data,
          attached: function() {

            var allImageTags = find.all( 'img', this.$el );
            var numLoaded = 0;
            var img;

            var imgFinish = function() {

              if( ++numLoaded == allImageTags.length ) {

                done();
              }
            };

            if( allImageTags.length > 0 ) {

              for( var i = 0, len = allImageTags.length; i < len; i++ ) {

                img = allImageTags[ i ];

                img.onload = function() {

                  imgFinish();
                };

                img.onerror = function() {

                  remove( this );

                  imgFinish();
                }.bind( img );
              }  
            } else {

              done();
            }
          }
        });
      } else {

        done();
      }
    }.bind( this ));
  },

  aniIn: function( req, done ) {

    Tween.to( this.container, 0.25, { delay: 0.125, opacity: 1, ease: Expo.easeOut, onComplete: done } );
  },

  aniOut: function( req, done ) {

    Tween.to( this.container, 0.25, { opacity: 0, ease: Expo.easeOut, onComplete: done } );
  },

  destroy: function( req, done ) {

    this.docVue.$destroy( true );

    remove( this.container );

    done();
  }
};