import moduleForAcceptance from '../helpers/module-for-acceptance';
import { test } from 'qunit';
import $ from 'jquery';

moduleForAcceptance('Acceptance: ApplicationRendersTest', {
});

test('visiting /', async function(assert) {
  assert.expect(3);

  await visit('/');

  assert.equal($('h2#title').html(),"Welcome to Ember.js");
  assert.equal($('p.para').html(), "This is a paragraph that compiles to Handlebars.js");
  assert.equal($('h4.header').html(), "This is an h4");
});
