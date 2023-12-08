const { EC2Client, RunInstancesCommand, DescribeInstancesCommand } = require('@aws-sdk/client-ec2');
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
    console.error('Error createEC2Instance:', err);
    return null;
  } finally {
    // ec2Client.destroy();
    // ec2Client = null;
  }
}

async function getInstanceDataById(id) {
  try {
    const client = initEC2Client();
    const describeInstancesParams = { InstanceIds: [id] };
    const req = new DescribeInstancesCommand(describeInstancesParams);

    return client.send(req);
  } catch (err) {
    console.error('Error getInstanceDataById:', err);
    return null;
  }
}

async function describeAllInstances(options = {}) {
  try {
    const client = initEC2Client();
    const req = new DescribeInstancesCommand(options);

    const data = await client.send(req);
    const instances = data.Reservations.flatMap((reservation) => reservation.Instances);

    return instances;
  } catch (err) {
    console.error('Error describing instances:', err);
    return null;
  }
}

module.exports = {
  createEC2Instance,
  getInstanceDataById,
  describeAllInstances
};
