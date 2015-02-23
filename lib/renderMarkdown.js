var marked = require('marked');
var highlightjs = require( 'highlight.js' );

var httpRepoAddress = '';

var renderer = new marked.Renderer();

var getURL = function( url ) {

  if( httpRepoAddress != '' && !/^http/i.test( url ) ) {

    return httpRepoAddress + url;
  } else {

    url;
  }
};

renderer.heading = function( text, level ) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + '>' + text +  '</h' + level + '>';
};

renderer.link = function( href, title, text ) {

  return '<a href="' + getURL( href ) + '" title="' + title +'" >' + text + '</a>';
};

renderer.image = function( href, title, text ) {

  var out = '<img src="' + getURL( href ) + '" alt="' + text + '"';

  if (title) {
    out += ' title="' + title + '"';
  }

  out += this.options.xhtml ? '/>' : '>';

  return out;
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

module.exports = function( markdown, packageJSON ) {

  // if it is a git repo get the path for relative links from the repo url
  if( packageJSON.repository && packageJSON.repository.url.indexOf( 'github' ) >= 0 ) {

    var baseGitHubURL = /(github.com.+)\.git/i.exec( packageJSON.repository.url );

    if( baseGitHubURL ) {

      httpRepoAddress = 'https://' + baseGitHubURL[ 1 ] + '/blob/v' + packageJSON.version + '/';  
    } else {

      httpRepoAddress = '';
    }
    
  } else {

    httpRepoAddress = '';
  }

  return marked( markdown );
};