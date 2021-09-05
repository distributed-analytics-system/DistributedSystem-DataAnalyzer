'use strict';

const handler = require('./handler');
const Joi = require('joi');

const validation = {
  params: Joi.object({
    uuid: Joi.string().guid().required()
  }),
  query: Joi.object({
    timePeriod: Joi.number().positive().required()
  })
};

module.exports = {
  method: 'get',
  route: '/v1/users/:uuid/clicks',
  validation,
  handler
};
