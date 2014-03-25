mimosa-ember-handlebars
===========

## Overview

This is a Ember Handlebars compiler for the Mimosa build tool. This module is for use with Mimosa `2.0+`.  This replicates the Ember functionality of Handlebars compiler that was built into Mimosa before `2.0`.

This module targets Handlebars's use with Ember. If you are using Handlebars outside of Ember, this will likely not work well for you. You probably want [mimosa-handlebars](https://github.com/dbashford/mimosa-handlebars).

For more information regarding Mimosa, see http://mimosa.io

## Usage

Add `'ember-handlebars'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

This module will compile Ember Handlebars files during `mimosa watch` and `mimosa build`.

This module utilizes all of the built-in template behavior that comes with Mimosa's basic template compiler.  See the [mimosa website](http://mimosa.io/compilers.html#mt) for more information about how templates are treated or check out the various [`template` configuration options](http://mimosa.io/configuration.html#templates).

This module wraps the [ember-template-compiler](https://github.com/toranb/ember-template-compiler).

## Default Config

```coffeescript
emberHandlebars:
  extensions: ["hbs", "handlebars"]
  helpers:["app/template/handlebars-helpers"]
  emberPath: "vendor/ember"
```

* `extensions`: an array of strings, the extensions of your Handlebars files.
* `helpers`: an array of strings, the paths from `watch.javascriptDir` to the files containing handlebars helper/partial registrations
* `emberPath`: AMD path for the Ember library, this is used as a dependency in the compiled templates.

## Using specific Handlebars or Ember Template Compiler
* `npm install handlebars@` a specific handlebars version into your project and this module will use it.
* `npm install ember-template-compiler@` a specific version into your project and this module will use it.
