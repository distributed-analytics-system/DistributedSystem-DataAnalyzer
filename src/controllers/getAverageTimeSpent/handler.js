'use strict';

const logger = require('../../logger');
const error = require('../../errors');
const database = require('../../database');
const { databaseTableName } = require('../../constants');

module.exports = async (req, res) => {
  const {
    params: { uuid },
    query: { screen },
    metadata: { reqId }
  } = req;

  logger.debug({ message: 'Reading the data from database', id: reqId });
  let averageTimespent = 0;
  try {
    const data = await database.get({ tableName: databaseTableName, key: uuid });
    if (!data) {
      throw new error.NotFound({message: 'The user could not be found'});
    }
    
    if (data[screen]) {
      averageTimespent = data[screen].timespent;
    }
  } catch (err) {
    if(err instanceof error.NotFound) {
      throw err;
    }

    throw new error.InternalServerError({ message: err.message });
  }

  res.status(200).json({
    timespent: averageTimespent
  });
};
