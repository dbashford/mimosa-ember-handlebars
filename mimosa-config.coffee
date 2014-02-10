exports.config =
  modules: ["jshint", "copy"]
  watch:
    sourceDir: "src"
    compiledDir: "lib"
    javascriptDir: null
    exclude: ["client/handlebars.js", "resources/ember-compiler.js"]
  jshint:
    rules:
      node: true
      laxcomma: true