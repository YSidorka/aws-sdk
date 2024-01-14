const {
  LambdaClient,
  ListFunctionsCommand,
  CreateFunctionCommand
} = require('@aws-sdk/client-lambda');
const { credentials, defaultRegion } = require('../common/config').AWS;

async function wrapper({ region, fn, $name }) {
  let client;
  try {
    client = new LambdaClient({
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

const params = {
  FunctionName: 'YourFunctionName',
  Runtime: 'nodejs20.x',
  // Role: 'arn:aws:iam::your-account-id:role/your-role-name', // Replace with your IAM role ARN
  Handler: 'index.handler',
  Code: {
    S3Bucket: 'your-s3-bucket',
    S3Key: 'lambda.zip'
  }
};

async function createLambda(options, region) {
  const fn = (obj) => new CreateFunctionCommand(obj);
  const result = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, options || params)
  });

  return result;
}

async function getLambdaByName(name, region) {
  const fn = (obj) => new ListFunctionsCommand(obj);

  const data = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, { Bucket: name })
  });

  const result = data?.Functions.filter((item) => item.FunctionName === name);
  return result;
}

module.exports = {
  createLambda,
  getLambdaByName
};
