"use strict";

var fs = require( "fs" )
  , path = require( "path" )
  , logger = null
  , config = require( "./config" )
  , getExtensions = function ( mimosaConfig ) {
    logger = mimosaConfig.log;
    return mimosaConfig.emberHandlebars.extensions;
  }
  , emberBoilerplate = "var template = Ember.Handlebars.template, templates = {};\n";

var prefix = function ( mimosaConfig ) {
  if ( mimosaConfig.template.wrapType === "amd" ) {
    logger.debug( "Building Handlebars template file wrapper" );
    var jsDir = path.join( mimosaConfig.watch.sourceDir, mimosaConfig.watch.javascriptDir )
      , possibleHelperPaths = []
      , helperPaths
      , defineString
      , defines = []
      , params = [];

    // build list of possible paths for helper files
    mimosaConfig.extensions.javascript.forEach( function( ext ) {
      mimosaConfig.emberHandlebars.helpers.forEach( function( helperFile ) {
        possibleHelperPaths.push( path.join( jsDir, helperFile + "." + ext ) );
      });
    });

    // filter down to just those that exist
    helperPaths = possibleHelperPaths.filter( function ( p) {
      return fs.existsSync( p );
    });

    // set up initial define dependency array and the array export parameters
    defines.push( "'" + mimosaConfig.emberHandlebars.emberPath + "'" );
    params.push( "Ember" );

    // build proper define strings for each helper path
    helperPaths.forEach( function( helperPath ) {
      var helperDefine = helperPath.replace( mimosaConfig.watch.sourceDir, "" )
        .replace( /\\/g, "/" )
        .replace( /^\/?\w+\/|\.\w+$/g, "" );
      defines.push( "'" + helperDefine + "'" );
    });

    defineString = defines.join( "," );

    if ( logger.isDebug() ) {
      logger.debug( "Define string for Handlebars templates [[ " + defineString + " ]]" );
    }

    return "define([" + defineString + "], function (" + (params.join(",")) + "){\n  " + emberBoilerplate;
  } else {
    if ( mimosaConfig.template.wrapType === "common" ) {
      return "var Ember = require('" + mimosaConfig.template.commonLibPath + "');\n" + emberBoilerplate;
    }
  }

  return emberBoilerplate;
};


var suffix = function (config) {
  if ( config.template.wrapType === "amd" ) {
    return "return templates; });";
  } else {
    if ( config.template.wrapType === "common" ) {
      return "\nmodule.exports = templates;";
    }
  }

  return "";
};

var compile = function (mimosaConfig, file, cb) {
  var output, error;

  try {
    output = mimosaConfig.emberHandlebars.precompile( file.inputFileText, false );
    output = "Ember.TEMPLATES['" + file.templateName + "'] = template(" + output.toString() + ")";
  } catch ( err ) {
    error = err;
  }

  cb( error, output );
};

module.exports = {
  name: "emberHandlebars",
  compilerType: "template",
  clientLibrary: path.join( __dirname, "client", "handlebars.js" ),
  compile: compile,
  suffix: suffix,
  prefix: prefix,
  extensions: getExtensions,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};
