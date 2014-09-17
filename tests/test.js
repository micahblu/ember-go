App.rootElement = '#ember-test';

App.setupForTesting();

App.injectTestHelpers();

module( "Foo", {
  setup: function() {
  	App.reset();

    // prepare something for all following tests
  	this.app = new App.ApplicationController();

  },
  teardown: function() {
    // clean up after each test
  }
});

test("Bar", function(){
  equal(this.app.foo, 'bar', 'got foobar baby');
});