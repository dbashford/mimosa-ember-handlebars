"use strict";

exports.defaults = function() {
  return {
    emberHandlebars: {
      extensions: ["hbs", "handlebars"],
      helpers:["app/template/handlebars-helpers"],
      emberPath: "vendor/ember"
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n"+
         "  # emberHandlebars:         # config settings for the EmberHandlebars compiler module\n" +
         "    # lib: undefined         # use this property to provide a specific version of Handlebars\n" +
         "    # extensions: [\"hbs\", \"handlebars\"]  # default extensions for EmberHandlebars files\n" +
         "    # helpers:[\"app/template/handlebars-helpers\"]  # the paths from watch.javascriptDir to\n" +
         "                             # the files containing handlebars helper/partial registrations\n" +
         "    # emberPath: \"vendor/ember\" # AMD path of the Ember library, this is used as a\n" +
         "                             # dependency in the compiled templates.\n";
};

exports.validate = function( config, validators ) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "emberHandlebars config", config.emberHandlebars ) ) {

    if ( !config.emberHandlebars.lib ) {
      config.emberHandlebars.lib = require( 'handlebars' );
    }

    var ec = require( './resources/ember-compiler' );
    config.emberHandlebars.handlebars = ec.makeHandlebars( config.emberHandlebars.lib );

    if ( validators.isArrayOfStringsMustExist( errors, "emberHandlebars.extensions", config.emberHandlebars.extensions ) ) {
      if (config.emberHandlebars.extensions.length === 0) {
        errors.push( "emberHandlebars.extensions cannot be an empty array");
      }
    }

    validators.ifExistsIsArrayOfStrings( errors, "emberHandlebars.helpers", config.emberHandlebars.helpers );
    validators.ifExistsIsString( errors, "emberHandlebars.emberPath", config.emberHandlebars.emberPath );

  }

  return errors;
};