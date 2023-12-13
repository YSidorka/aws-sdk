const {
  EC2Client,
  RunInstancesCommand,
  DescribeInstancesCommand,
  DescribeSecurityGroupsCommand,
  CreateSecurityGroupCommand,
  AuthorizeSecurityGroupIngressCommand,
  AuthorizeSecurityGroupEgressCommand,
  DescribeSubnetsCommand,
  CreateTagsCommand,
  RevokeSecurityGroupEgressCommand,
  RequestSpotInstancesCommand
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
  const fn = (obj) => new RunInstancesCommand(obj);
  fn.$name = arguments.callee.name;
  return wrapper(region, fn.bind(null, options));
}

async function requestSpotEC2Instance(options, region) {
  const { SpotPrice, InstanceCount, ...LaunchSpecification } = options;

  const request = {
    SpotPrice,
    InstanceCount,
    LaunchSpecification
  };

  const fn = (obj) => new RequestSpotInstancesCommand(obj);
  fn.$name = arguments.callee.name;
  return wrapper(region, fn.bind(null, request));
}

async function getInstanceDataById(id, region) {
  const fn = (obj) => new DescribeInstancesCommand(obj);
  fn.$name = arguments.callee.name;
  const data = await wrapper(region, fn.bind(null, { InstanceIds: [id] }));

  return data?.Reservations;
}

async function getInstances(options, region) {
  const fn = (obj) => new DescribeInstancesCommand(obj);
  fn.$name = arguments.callee.name;
  const data = await wrapper(region, fn.bind(null, options || {}));

  let result = data?.Reservations.flatMap((reservation) => reservation.Instances);
  result = result.filter((instance) => instance.State.Name !== 'terminated');
  return result;
}

async function createSecurityGroup(options, region) {
  const fn = (obj) => new CreateSecurityGroupCommand(obj);
  fn.$name = arguments.callee.name;
  const { GroupId } = await wrapper(region, fn.bind(null, options || {}));

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
  const fn = (obj) => new DescribeSecurityGroupsCommand(obj);
  fn.$name = arguments.callee.name;
  const data = await wrapper(region, fn.bind(null, options || {}));

  return data?.SecurityGroups || [];
}

async function getSubnetByAZ(azName, region) {
  const fn = (obj) => new DescribeSubnetsCommand(obj);
  fn.$name = arguments.callee.name;

  const data = await wrapper(
    region,
    fn.bind(null, {
      Filters: [
        { Name: 'availabilityZone', Values: [azName] },
        { Name: 'tag:Name', Values: [azName] }
      ]
    })
  );
  return data?.Subnets[0];
}

async function assignTagParams(options, region) {
  const fn = (obj) => new CreateTagsCommand(obj);
  fn.$name = arguments.callee.name;
  return wrapper(region, fn.bind(null, options || {}));
}

async function assignSecurityGroupInboundRule(options, region) {
  const fn = (obj) => new AuthorizeSecurityGroupIngressCommand(obj);
  fn.$name = arguments.callee.name;
  return wrapper(region, fn.bind(null, options || {}));
}

async function assignSecurityGroupOutboundRule(options, region) {
  const fn = (obj) => new AuthorizeSecurityGroupEgressCommand(obj);
  fn.$name = arguments.callee.name;
  return wrapper(region, fn.bind(null, options || {}));
}

async function removeSecurityGroupOutboundRule(options, region) {
  const fn = (obj) => new RevokeSecurityGroupEgressCommand(obj);
  fn.$name = arguments.callee.name;
  return wrapper(region, fn.bind(null, options || {}));
}

module.exports = {
  createEC2Instance,
  requestSpotEC2Instance,

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
