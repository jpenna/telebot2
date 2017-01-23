const config = require('../../config.json');
const _ = require('lodash');

const env = process.env.NODE_ENV || 'dev';

// Get config for environment (development, test)
const envConfig = config[env];

// Goin defult config
const configObj = _.assign(config.default, envConfig);

Object.keys(configObj).forEach((key) => {
  process.env[key] = configObj[key];
});
