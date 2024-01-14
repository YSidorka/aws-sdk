const { FRANKFURT, ZURICH } = require('../common/config');
const S3Class = require('../s3/s3.class');

const items = {
  's3-lambda-store-euc1': {
    Name: `s3-lambda-store-euc1`,
    Region: FRANKFURT
  }
};

module.exports = Object.values(items).map((item) => new S3Class(item));
