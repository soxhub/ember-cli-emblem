import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('Acceptance: ApplicationRendersTest', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    assert.expect(3);

    await visit('/');

    assert.dom('h2#title').hasText("Welcome to Ember.js");
    assert.dom('p.para').hasText( "This is a paragraph that compiles to Handlebars.js");
    assert.dom('h4.header').hasText( "This is an h4");
  });
});
