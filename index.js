'use strict';

const Filter = require('broccoli-filter');
const checker = require('ember-cli-version-checker');
const path = require('path');
const defaults = require('lodash.defaults');
const assign = require('lodash.assign');
const emblem = require('emblem').default;

function TemplateCompiler (inputTree, options) {
  if (!(this instanceof TemplateCompiler)) {
    return new TemplateCompiler(inputTree, options);
  }

  Filter.call(this, inputTree, options); // this._super()

  this.options = options || {};
  this.inputTree = inputTree;

  this.compile = this.options.emblemCompiler || emblem.compile;
  this.compilerOptions = defaults(options, {
    quiet: false,
    debugging: false
  });
}

TemplateCompiler.prototype = Object.create(Filter.prototype);
TemplateCompiler.prototype.constructor = TemplateCompiler;
TemplateCompiler.prototype.extensions = ['embl', 'emblem', 'em'];
TemplateCompiler.prototype.targetExtension = 'hbs';

TemplateCompiler.prototype.processString = function (string, relativePath) {
  const options = assign({}, this.compilerOptions, { file: relativePath });

  return this.compile(string, options);
}

module.exports = {
  name: 'ember-cli-emblem',

  shouldSetupRegistryInIncluded() {
    return !checker.isAbove(this, '0.2.0');
  },

  getConfig() {
    const brocfileConfig = {};
    const emblemOptions = defaults(this.project.config(process.env.EMBER_ENV).emblemOptions || {},
      brocfileConfig, {
        blueprints: true
      });

    return emblemOptions;
  },

  blueprintsPath() {
    if (this.getConfig().blueprints) {
      return path.join(__dirname, 'blueprints');
    }
  },

  setupPreprocessorRegistry(type, registry) {
    const addonContext = this;
    const compiler = {
      name: 'ember-cli-emblem',
      ext: ['embl', 'emblem', 'em'],
      toTree(tree) {
        return TemplateCompiler(tree, addonContext.getConfig());
      }
    };

    registry.add('template', compiler);
  },

  included(app){
    this._super.included.apply(this, arguments);

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  }
};
