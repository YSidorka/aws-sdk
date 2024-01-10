const { createS3Buckets } = require('../common');
const S3_LIST = require('./s3.list');

async function init() {
  try {
    console.log(`Init start`);
    const s3List = await createS3Buckets(S3_LIST);

    console.log(s3List);
  } catch (err) {
    console.log('Error:', err);
  }
}

module.exports = init;
