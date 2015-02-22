var vue = require( 'vue' );
var model = require( './model' );
var framework = require( './framework' );

var path, moduleName, treePart;

var menu = new vue( {

  el: '#menu-container',
  template: '#menu-template',
  data: model,
  methods: {

    onClick: function( e ) {

      path.push( e.target.innerText );

      setupPath();
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

var setupPath = function() {

  treePart = getTreePart();

  framework.go( path.join( '/' ) );
};

module.exports = {

  init: function( req, done ) {

    if( req.splats[ 0 ] != '' ) {

      path = req.splats[ 0 ].split( '/' );  
      moduleName = path[ path.length - 1 ];
    } else {

      path = [];
      moduleName = model.menu.tree.moduleName;
    }

    treePart = getTreePart();

    updateVueData();

    done();
  }
};