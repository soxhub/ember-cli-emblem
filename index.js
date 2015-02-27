/* jshint node: true */
'use strict';

var Filter = require('broccoli-filter');

function TemplateCompiler (inputTree, options) {
  if (!(this instanceof TemplateCompiler)) {
    return new TemplateCompiler(inputTree, options);
  }

  Filter.call(this, inputTree, options); // this._super()

  this.options = options || {};
  this.inputTree = inputTree;

  this.compile = this.options.emblemCompiler || require('emblem').default.compile;
}

TemplateCompiler.prototype = Object.create(Filter.prototype);
TemplateCompiler.prototype.constructor = TemplateCompiler;
TemplateCompiler.prototype.extensions = ['embl', 'emblem'];
TemplateCompiler.prototype.targetExtension = 'hbs';

TemplateCompiler.prototype.processString = function (string, relativePath) {
  return this.compile(string);
}

module.exports = {
  name: 'ember-cli-emblem-hbs-printer',
  included: function(app){
    this.app = app;
    var compiler = {
      toTree: function(tree, inputPath, outputPath) {
        return TemplateCompiler(tree);
      }
    };
    this.app.registry.remove('template', 'broccoli-ember-hbs-template-compiler');
    this.app.registry.add('template', compiler, ['embl', 'emblem']);
    this.app.registry.add('template', 'broccoli-ember-hbs-template-compiler', ['hbs', 'handlebars']);
  }

};
