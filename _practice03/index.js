const { createS3Buckets } = require('../common');
const { getLambdaByName } = require('../lambda');
const S3_LIST = require('./s3.list');
const LAMBDA_LIST = require('./lambda.list');

async function init() {
  try {
    console.log(`Init start`);
    const s3List = await createS3Buckets(S3_LIST);
    console.log(s3List);

    const result = await getLambdaByName(LAMBDA_LIST[0].FunctionName, LAMBDA_LIST[0].Region);
    console.log(result);
  } catch (err) {
    console.log('Error:', err);
  }
}

module.exports = init;
