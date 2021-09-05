'use strict';

const logger = require('../../logger');
const error = require('../../errors');
const datastore = require('../../database');

module.exports = async (req, res) => {
  const {
    params: { 'user-uuid': userUuid },
    query: { timePeriod },
    metadata: { reqId },
    headers: { authorization }
  } = req;

  // TODO: read from DB

  res.status(200).end();
};
