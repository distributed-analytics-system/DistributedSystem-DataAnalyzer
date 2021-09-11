'use strict';

const handler = require('./handler');
const Joi = require('joi');

const validation = {
  params: Joi.object({
    uuid: Joi.string().guid().required()
  }),
  query: Joi.object({
    screen: Joi.string().valid('home', 'account', 'notifications', 'settings').required()
  })
};

module.exports = {
  method: 'get',
  route: '/v1/statistics/users/:uuid/timespent',
  validation,
  handler
};
