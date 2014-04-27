'use strict';

var secrets = (function() {
  var _secrets = {};
  if(!process.env.SESSION_SECRET) {
    throw new Error('You must set the SESSION_SECRET environment variable');
  }
  _secrets.session = process.env.SESSION_SECRET;

  return _secrets;
})();

module.exports = {
  env: 'production',
  secrets: secrets,
  ip:   process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        undefined,
  port: process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        8080,
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
         'mongodb://localhost/ng'
  }
};
