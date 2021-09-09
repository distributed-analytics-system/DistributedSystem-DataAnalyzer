'use strict';

const logger = require('../../logger');
const error = require('../../errors');
const database = require('../../database');
const { databaseTableName } = require('../../constants');

module.exports = async (req, res) => {
  const {
    params: { uuid },
    query: { timePeriod },
    metadata: { reqId }
  } = req;

  logger.debug({ message: 'Reading the data from database', id: reqId });
  let averageClicks = 0;
  try {
    const data = await database.get({ tableName: databaseTableName, key: uuid });
    if (!data) {
      throw new error.NotFound({message: 'The user could not be found'});
    }

    let totalClicks = 0;
    let totalTimespent = 0;
    for (let clickData of Object.values(data)) {
      totalClicks += clickData.clicks;
      totalTimespent += clickData.timespent;
    }

    if (totalTimespent !== 0) {
      averageClicks = ((timePeriod * totalClicks) / totalTimespent);
    }
  } catch (err) {
    if(err instanceof error.NotFound) {
      throw err;
    }

    throw new error.InternalServerError({ message: err.message });
  }

  res.status(200).json({
    count: averageClicks
  });
};
