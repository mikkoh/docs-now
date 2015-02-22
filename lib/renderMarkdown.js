var marked = require('marked');
var highlightjs = require( 'highlight.js' );

marked.setOptions({
  
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function( md ) {

    return highlightjs.highlightAuto( md ).value;
  }
});

module.exports = function( markdown ) {

  return marked( markdown );
};