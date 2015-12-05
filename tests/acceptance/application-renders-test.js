import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: ApplicationRendersTest', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /', function(assert) {
  assert.expect(3);

  visit('/');

  andThen(function() {
    assert.equal(Ember.$('h2#title').html(),"Welcome to Ember.js");
    assert.equal(Ember.$('p.para').html(), "This is a paragraph that compiles to Handlebars.js");
    assert.equal(Ember.$('h4.header').html(), "This is an h4");
  });
});
