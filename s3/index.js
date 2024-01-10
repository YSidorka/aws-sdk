const {
  S3Client,
  CreateBucketCommand,
  PutBucketTaggingCommand,
  HeadBucketCommand
} = require('@aws-sdk/client-s3');

const { credentials, defaultRegion } = require('../common/config').AWS;

async function wrapper({ region, fn, $name }) {
  let client;
  try {
    client = new S3Client({
      credentials,
      region: region || defaultRegion
    });
    return await client.send(fn());
  } catch (err) {
    console.log(`Error ${$name}:`, err.message);
    return null;
  } finally {
    client?.destroy();
    client = null;
  }
}

/*
const params = {
  Bucket: bucketName,
  CreateBucketConfiguration: {
    LocationConstraint: region,
  },
};
*/

async function createS3Bucket(options, region) {
  const fn = (obj) => new CreateBucketCommand(obj);
  const data = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, options)
  });

  if (!data) return;
  const result = await assignBucketTagParams(options, region);

  return result;
}

async function assignBucketTagParams(options, region) {
  const fn = (obj) => new PutBucketTaggingCommand(obj);
  return wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, {
      Bucket: options.Bucket,
      Tagging: {
        TagSet: options.Tags
      }
    })
  });
}

async function getBucketByName(name, region) {
  const fn = (obj) => new HeadBucketCommand(obj);
  return await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, { Bucket: name })
  });
}

module.exports = {
  createS3Bucket,
  getBucketByName,

  assignBucketTagParams
};
