'use strict';

const { environments } = require('../constants');
const config = require('../config');

const AWS = require("aws-sdk");
const { awsRegion } = require('../config');

AWS.config.update({
  region: awsRegion
});

const dynamoConfig = {};
if (config.nodeEnv === environments.dev) {
  dynamoConfig.endpoint = process.env.AWS_ENDPOINT;
}

const dynamodb = new AWS.DynamoDB(dynamoConfig);

const generateGetItemsRequest = (keys) => {
  return keys.map((key) => {
    return {
       "UserUuid": {
         S: key
      }
    }
  });
}

const get = (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: {
       "UserUuid": {
         S: options.key
        }
      }, 
      TableName: options.tableName
    };

    dynamodb.getItem(params, function(err, data) {
      if (err) {
        console.error("Unable to get item", JSON.stringify(err));
        return reject(err);
      } else {
        if (data.Item) {
          const itemData = Object.values(data.Item.Data);
          if (itemData.length !== 0) {
            return resolve(JSON.parse(itemData[0]));
          }
        }

        return resolve();
      }
    });
  });
}

module.exports = {
  get
}
