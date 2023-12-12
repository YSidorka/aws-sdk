const {
  EC2Client,
  RunInstancesCommand,
  DescribeInstancesCommand,
  DescribeSecurityGroupsCommand,
  CreateSecurityGroupCommand,
  AuthorizeSecurityGroupIngressCommand,
  AuthorizeSecurityGroupEgressCommand,
  DescribeSubnetsCommand,
  CreateTagsCommand, RevokeSecurityGroupEgressCommand
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

async function createSecurityGroup(options, region) {
  const fn = ((options) => new CreateSecurityGroupCommand(options)).bind(null, options || {});
  fn.$name = arguments.callee.name;
  const { GroupId } = await wrapper(region, fn);

  if (!GroupId) return null;

  if (options.IpPermissions.length > 0) {
    await assignSecurityGroupInboundRule({
      GroupId,
      IpPermissions: options.IpPermissions
    }, region);
  }

  if (options.IpPermissionsEgress.length > 0) {
    await assignSecurityGroupOutboundRule({
     GroupId,
      IpPermissions: options.IpPermissionsEgress
    }, region);

    await removeSecurityGroupOutboundRule({
      GroupId,
      IpPermissions: [{ IpProtocol: '-1', IpRanges: [{ CidrIp: '0.0.0.0/0' }] }]
    }, region);
  }

  const [result] = await getSecurityGroups({ GroupIds: [GroupId] }, region);
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
    Filters: [
      { Name: 'availabilityZone', Values: [azName] },
      { Name: 'tag:Name', Values: [azName] }
    ]
  });
  fn.$name = arguments.callee.name;
  let data = await wrapper(region, fn);

  if (data?.Subnets.length > 1) {
    const fn = ((options) => new DescribeSubnetsCommand(options)).bind(null, {
      Filters: [
        { Name: 'availabilityZone', Values: [azName] },
        { Name: 'tag:Name', Values: [azName] }
      ]
    });
    fn.$name = arguments.callee.name;
    data = await wrapper(region, fn);
  }

  return data?.Subnets[0];
}

async function assignTagParams(options, region) {
  const fn = ((options) => new CreateTagsCommand(options)).bind(null, options || {});
  fn.$name = arguments.callee.name;
  const result = await wrapper(region, fn);

  return result;
}

async function assignSecurityGroupInboundRule(options, region) {
  const fn = ((options) => new AuthorizeSecurityGroupIngressCommand(options)).bind(null, options || {});
  fn.$name = arguments.callee.name;
  const result = await wrapper(region, fn);

  return result;
}

async function assignSecurityGroupOutboundRule(options, region) {
  const fn = ((options) => new AuthorizeSecurityGroupEgressCommand(options)).bind(null, options || {});
  fn.$name = arguments.callee.name;
  const result = await wrapper(region, fn);

  return result;
}

async function removeSecurityGroupOutboundRule(options, region) {
  const fn = ((options) => new RevokeSecurityGroupEgressCommand(options)).bind(null, options || {});
  fn.$name = arguments.callee.name;
  const result = await wrapper(region, fn);

  return result;
}

module.exports = {
  createEC2Instance,
  getInstanceDataById,
  getInstances,

  createSecurityGroup,
  getSecurityGroups,

  assignSecurityGroupInboundRule,
  assignSecurityGroupOutboundRule,
  removeSecurityGroupOutboundRule,

  getSubnetByAZ,
  assignTagParams
};
