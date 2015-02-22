var vue = require( 'vue' );
var find = require( 'dom-select' );
var remove = require( 'dom-remove' );
var Tween = require( 'gsap' );
var model = require( './model' );
var framework = require( './framework' );

module.exports = menu;

var prevPath;

function menu() {}

menu.prototype = {

  init: function( req, done ) {

    var path, moduleName, treePart;

    var containerMenu = find( '#menu-container' );
    var container = this.container = document.createElement( 'div' );

    container.className = 'container';

    containerMenu.appendChild( container );

    var menu = this.menuVue = new vue( {

      el: container,
      template: '#menu-template',
      data: model,
      methods: {

        onClick: function( e ) {

          framework.go( path.join( '/' ) + '/' + e.target.innerText );
        }
      }
    });

    var get = function( data, path ) {

      var returnValue = data;

      path.forEach( function( part ) {

        returnValue = returnValue[ part ];
      });

      return returnValue;
    };

    var getTreePart = function() {

      if( path.length > 0 ) {

        return get( model.menu.tree.modules, path );  
      } else {

        return model.menu.tree.modules;
      }
    };

    var updateVueData = function() {

      menu.$data = {

        name: moduleName,
        modules: Object.keys( treePart ).length > 0 ? treePart : null
      }
    };

    this.path = path = getPath( req );

    if( path.length > 0 ) {

      moduleName = path[ path.length - 1 ];  
    } else {

      moduleName = model.menu.tree.moduleName;  
    }
    
    treePart = getTreePart();

    updateVueData();

    done();
  },

  aniIn: function( req, done ) {

    if( !prevPath || this.path.length > prevPath.length ) {

      this.container.style.left = '200px';

      Tween.to( this.container, 0.5, { left: 0, opacity: 1, ease: Expo.easeOut, onComplete: done } );  
    } else {

      this.container.style.left = '-200px';

      Tween.to( this.container, 0.5, { left: 0, opacity: 1, ease: Expo.easeOut, onComplete: done } );  
    }
    
    prevPath = this.path.concat();
  },

  aniOut: function( req, done ) {

    if( this.path.length < getPath( req ).length ) {

      Tween.to( this.container, 0.5, { left: -200, opacity: 0, ease: Expo.easeOut, onComplete: done } );  
    } else {

      Tween.to( this.container, 0.5, { left: 200, opacity: 0, ease: Expo.easeOut, onComplete: done } );
    }
  },

  destroy: function( req, done ) {

    this.menuVue.$destroy( true );

    remove( this.container );

    done();
  }
};

function getPath( req ) {

  var path;

  if( req.splats[ 0 ] != '' ) {

    path = req.splats[ 0 ].split( '/' );  
  } else {

    path = [];
  }

  return path;
}