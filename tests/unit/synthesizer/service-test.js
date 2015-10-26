import { moduleFor, test } from 'ember-qunit';

moduleFor('service:synthesizer', 'Unit | Service | synthesizer', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

// Replace this with your real tests.
test('#noteToURL returns the URL for a given note', function(assert) {
  var service = this.subject();
  var note = {number: 60};
  assert.ok(service.noteToURL(note).indexOf('assets') > 0);
});
