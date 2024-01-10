const { FRANKFURT, ZURICH } = require('../common/config');
const S3Class = require('../s3/s3.class');

const items = {
  's3-lambda-store-euc1': {
    name: `s3-lambda-store-euc1`,
    region: FRANKFURT
  }
};

module.exports = Object.values(items).map((item) => new S3Class(item));
