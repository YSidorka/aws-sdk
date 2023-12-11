const {
  EC2Client,
  RunInstancesCommand,
  DescribeInstancesCommand,
  DescribeSecurityGroupsCommand,
  CreateSecurityGroupCommand,
  AuthorizeSecurityGroupIngressCommand,
  AuthorizeSecurityGroupEgressCommand, DescribeSubnetsCommand, CreateTagsCommand
} = require('@aws-sdk/client-ec2');
const { credentials, region: defaultRegion } = require('../common/config').AWS;



async function wrapper(region, fn) {
  let client;
  try {
    client = new EC2Client({
      credentials,
      region: region || defaultRegion
    });
    return await client.send(fn());
  } catch (err) {
    console.log(`Error ${fn?.$name}:`, err.message);
    return null;
  } finally {
    client?.destroy();
    client = null;
  }
}

async function createEC2Instance(options, region) {
  const fn = ((options) => new RunInstancesCommand(options)).bind(null, options);
  fn.$name = arguments.callee.name;
  return wrapper(region, fn);
}

async function getInstanceDataById(id, region) {
  const fn = ((options) => new DescribeInstancesCommand(options)).bind(null, { InstanceIds: [id] });
  fn.$name = arguments.callee.name;
  const data = await wrapper(region, fn);

  return data?.Reservations;
}

async function getInstances(options, region) {
  const fn = ((options) => new DescribeInstancesCommand(options)).bind(null, options || {});
  fn.$name = arguments.callee.name;
  const data = await wrapper(region, fn);

  let result = data?.Reservations.flatMap((reservation) => reservation.Instances);
  result = result.filter((instance) => instance.State.Name !== 'terminated');
  return result;
}

async function getSecurityGroups(options, region) {
  const fn = ((options) => new DescribeSecurityGroupsCommand(options)).bind(null, options || {});
  fn.$name = arguments.callee.name;
  const data = await wrapper(region, fn);

  return data?.SecurityGroups || [];
}

async function getSubnetByAZ(azName, region) {
  const fn = ((options) => new DescribeSubnetsCommand(options)).bind(null, {
  //  Filters: [{ Name: 'availabilityZone', Values: [azName] }]
  });
  fn.$name = arguments.callee.name;
  const data = await wrapper(region, fn);

  return data?.Subnets[0];
}

async function assignTagParams(options, region) {
  const fn = ((options) => new CreateTagsCommand(options)).bind(null, options || {});
  fn.$name = arguments.callee.name;
  const result = await wrapper(region, fn);

  return result;
}

module.exports = {
  createEC2Instance,
  getInstanceDataById,
  getInstances,
  getSecurityGroups,
  getSubnetByAZ,
  assignTagParams
};
