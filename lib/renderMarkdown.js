var marked = require('marked');
var highlightjs = require( 'highlight.js' );
var string = require( 'string' );

var httpRepoAddress = '';

var renderer = new marked.Renderer();

var getURL = function( url ) {

  if( httpRepoAddress != '' && url.charAt( 0 ) != '#' && !/^http/i.test( url ) ) {

    return httpRepoAddress + url;
  } else {

    return url;
  }
};

renderer.heading = function( text, level, raw ) {

  var out = '<h'
            + level
            + ( ( level == 1 ) ? ' name="' + string( text.toLowerCase() ).trim().dasherize().s + '"' : '' )
            + ' id="'
            + this.options.headerPrefix
            + text
            + '">'
            + text
            + '</h'
            + level
            + '>\n';

  return out;  
};

renderer.link = function( href, title, text ) {

  href = getURL( href );

  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
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