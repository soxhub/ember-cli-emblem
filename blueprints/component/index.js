var ancestralBlueprint = require('../../lib/ancestral-blueprint');

module.exports = {
  description: 'Generates a component. Name must contain a hyphen.',
  availableOptions: [
    {
      name: 'path',
      type: String,
      default: 'components',
      aliases:[
        {'no-path': ''}
      ]
    }
  ],
  locals: function(options) {
    return ancestralBlueprint('component', this.project).locals(options);
  },
  fileMapTokens: function() {
    return ancestralBlueprint('component', this.project).fileMapTokens();
  }
};
