const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Fact-checking-asisstant',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

