const config = require('../../config.json');
const _ = require('lodash');

const env = process.env.NODE_ENV || 'dev';

const envConfig = config[env];
const configObj = _.assign(config.default, envConfig);

Object.keys(configObj).forEach((key) => {
  process.env[key] = configObj[key];
});
