/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'noteriver',
    environment: environment,
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.AWS_ACCESS_KEY_ID = process.env.NOTERIVER_AWS_ACCESS_KEY_ID;
    ENV.AWS_BUCKET = 'noteriver-dev';

    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV.AWS_ACCESS_KEY_ID = process.env.NOTERIVER_AWS_ACCESS_KEY_ID;
    ENV.AWS_SECRET_ACCESS_KEY = process.env.NOTERIVER_AWS_SECRET_ACCESS_KEY;
    ENV.AWS_BUCKET = 'noteriver-test';

    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.AWS_ACCESS_KEY_ID = process.env.NOTERIVER_AWS_ACCESS_KEY_ID;
    ENV.AWS_BUCKET = 'noteriver';
  }

  return ENV;
};
