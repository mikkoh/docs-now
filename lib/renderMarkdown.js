var marked = require('marked');
var highlightjs = require( 'highlight.js' );

var renderer = new marked.Renderer();

renderer.heading = function( text, level ) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + '>' + text +  '</h' + level + '>';
};



marked.setOptions({
  
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function( md ) {

    return highlightjs.highlightAuto( md ).value;
  }
});

module.exports = function( markdown ) {

  return marked( markdown );
};