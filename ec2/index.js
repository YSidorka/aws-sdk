const { EC2Client, RunInstancesCommand } = require('@aws-sdk/client-ec2');
const { credentials, region } = require('../common/config').AWS;

let ec2Client;

function initEC2Client() {
  if (!ec2Client) ec2Client = new EC2Client({ credentials, region });
  return ec2Client;
}

async function createEC2Instance(options) {
  try {
    const client = initEC2Client();
    const req = new RunInstancesCommand(options);
    return await client.send(req);
  } catch (err) {
    console.error('Error creating EC2 instance:', err);
    return null;
  } finally {
    // ec2Client.destroy();
    // ec2Client = null;
  }
}

module.exports = {
  createEC2Instance
};
