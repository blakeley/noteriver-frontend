import {
  moduleFor,
  test
} from 'ember-qunit';

var key = "aVeryUniqueKey";
var value = "whateverValue";

moduleFor('service:storage', 'StorageService', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  afterEach: function(){
    delete localStorage[key];
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('the test value is unset before tests', function(assert){
  assert.ok(!localStorage[key]);
});

test('.setItem sets the item in localStorage', function(assert){
  var storage = this.subject();
  storage.setItem(key, value);
  assert.equal(localStorage[key], value);
});

test('.getItem gets the item in localStorage', function(assert){
  var storage = this.subject();
  localStorage[key] = value;
  assert.equal(storage.getItem(key), value);
});

test('.removeItem removes the item from localStorage', function(assert){
  var storage = this.subject();
  localStorage[key] = value;
  storage.removeItem(key);
  assert.equal(localStorage[key], undefined);
});

test('.setItem with a null value removes the item from localStorage', function(assert){
  var storage = this.subject();
  localStorage[key] = value;
  storage.setItem(key, null);
  assert.equal(localStorage[key], undefined);
});

test('.setItem with an undefined value removes the item from localStorage', function(assert){
  var storage = this.subject();
  localStorage[key] = value;
  storage.setItem(key, null);
  assert.equal(localStorage[key], undefined);
});








