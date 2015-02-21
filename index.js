#!/usr/bin/env node

var express = require( 'express' );
var expressStatic = require( 'express-static' );
var browserifyFrontend = require( './lib/browserifyFrontend' );
var getModuleTree = require( './lib/getModuleTree' );
var getReadme = require( './lib/getReadme' );
var renderMarkdown = require( './lib/renderMarkdown' );

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
  
  app.listen( 8888 );  
});
