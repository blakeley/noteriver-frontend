var VALID_DEPLOY_TARGETS = [ //update these to match what you call your deployment targets
  'prod'
];

module.exports = function(deployTarget) {
  var ENV = {
    build: {
      environment: 'production'
    },
    redis: {
      allowOverwrite: true,
      keyPrefix: 'noteriver:index'
    },
    s3: {
      prefix: '',
      accessKeyId: process.env.NOTERIVER_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NOTERIVER_AWS_SECRET_ACCESS_KEY,
      bucket: 'noteriver',
    },
    redis: {
      url: process.env.NOTERIVER_REDIS_URL
    }
  };

  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  return ENV;
}
