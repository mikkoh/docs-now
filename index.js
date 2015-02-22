#!/usr/bin/env node

var express = require( 'express' );
var expressStatic = require( 'express-static' );
var getPort = require( 'get-port' );
var open = require( 'open' );
var fs = require( 'fs' );
var browserifyFrontend = require( './lib/browserifyFrontend' );
var getModuleTree = require( './lib/getModuleTree' );
var getReadme = require( './lib/getReadme' );
var renderMarkdown = require( './lib/renderMarkdown' );

if( fs.existsSync( 'node_modules' ) ) {

  var app = express();

  app.use( expressStatic( __dirname + '/frontend' ) );

  app.get( '/tree', function( req, res ) {

    getModuleTree( res.send.bind( res ) );
  }); 

  app.get( '/module/*', function( req, res ) {

    getReadme( req.params, function( markdown ) {

      if( markdown ) {

        res.send( { ok: true, html: renderMarkdown( markdown ) } );  
      } else {

        res.send( { ok: false } );
      }
    });
  });

  // browserify the frontend code and then start the server
  browserifyFrontend( function() {
    
    getPort( function( err, port ) {

      if( err ) {

        port = 8888;
      }

      app.listen( port );

      open( 'http://localhost:' + port );

      console.log( 'docs-now is running at http://localhost:' + port );
    });
  });
} else {

  console.log( 'This folder doesn\'t contain a node_modules folder' );
}