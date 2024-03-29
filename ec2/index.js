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
  RequestSpotInstancesCommand,
  DescribeSpotInstanceRequestsCommand,
  CreateVpcCommand,
  DescribeVpcsCommand,
  CreateSubnetCommand
} = require('@aws-sdk/client-ec2');

const { sleep } = require('../common/utils');
const { credentials, defaultRegion } = require('../common/config').AWS;

async function wrapper({ region, fn, $name }) {
  let client;
  try {
    client = new EC2Client({
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

async function createEC2Instance(options, region) {
  const fn = (obj) => new RunInstancesCommand(obj);
  const data = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind({ $name: fn.$name }, options)
  });
  const result = Array.isArray(data.Instances) ? data.Instances : [];

  await assignTagParams(
    {
      Resources: result.map((item) => item.InstanceId),
      Tags: options.Tags
    },
    region
  );

  return result;
}

async function createSpotEC2Instance(instance, timer = 60000) {
  const response = await requestSpotInstance(instance, instance.Region);
  const spotRequestIds =
    response.SpotInstanceRequests?.map((instance) => instance.SpotInstanceRequestId) || [];

  await sleep(timer);

  const spotEC2List = await describeSpotInstances(spotRequestIds);
  await assignTagParams(
    {
      Resources: spotEC2List.map((item) => item.InstanceId),
      Tags: instance.Tags
    },
    instance.Region
  );

  return spotEC2List;
}

async function requestSpotInstance(options, region) {
  const { SpotPrice, InstanceCount, ...LaunchSpecification } = options;
  const request = {
    SpotPrice,
    InstanceCount,
    LaunchSpecification
  };
  const fn = (obj) => new RequestSpotInstancesCommand(obj);
  return wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, request)
  });
}

async function describeSpotInstances(idList, region) {
  const fn = (obj) => new DescribeSpotInstanceRequestsCommand(obj);
  const data = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, { SpotInstanceRequestIds: idList } || {})
  });
  return data.SpotInstanceRequests || [];
}

async function getInstanceDataById(id, region) {
  const fn = (obj) => new DescribeInstancesCommand(obj);
  const data = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, { InstanceIds: [id] })
  });

  return data?.Reservations;
}

async function getInstances(options, region) {
  const fn = (obj) => new DescribeInstancesCommand(obj);
  const data = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, options || {})
  });

  let result = data?.Reservations.flatMap((reservation) => reservation.Instances);
  result = result.filter((instance) => instance.State.Name !== 'terminated');
  return result;
}

async function createSecurityGroup(options, region) {
  const fn = (obj) => new CreateSecurityGroupCommand(obj);
  const { GroupId } = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, options || {})
  });

  if (!GroupId) return null;

  if (options.IpPermissions.length > 0) {
    await assignSecurityGroupInboundRule(
      {
        GroupId,
        IpPermissions: options.IpPermissions
      },
      region
    );
  }

  if (options.IpPermissionsEgress.length > 0) {
    await assignSecurityGroupOutboundRule(
      {
        GroupId,
        IpPermissions: options.IpPermissionsEgress
      },
      region
    );

    await removeSecurityGroupOutboundRule(
      {
        GroupId,
        IpPermissions: [{ IpProtocol: '-1', IpRanges: [{ CidrIp: '0.0.0.0/0' }] }]
      },
      region
    );
  }

  const [result] = await getSecurityGroups({ GroupIds: [GroupId] }, region);
  return result;
}

async function getSecurityGroups(options, region) {
  const fn = (obj) => new DescribeSecurityGroupsCommand(obj);
  const data = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, options || {})
  });
  return data?.SecurityGroups || [];
}

async function assignTagParams(options, region) {
  const fn = (obj) => new CreateTagsCommand(obj);
  return wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, options || {})
  });
}

async function assignSecurityGroupInboundRule(options, region) {
  const fn = (obj) => new AuthorizeSecurityGroupIngressCommand(obj);
  return wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, options || {})
  });
}

async function assignSecurityGroupOutboundRule(options, region) {
  const fn = (obj) => new AuthorizeSecurityGroupEgressCommand(obj);
  return wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, options || {})
  });
}

async function removeSecurityGroupOutboundRule(options, region) {
  const fn = (obj) => new RevokeSecurityGroupEgressCommand(obj);
  return wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, options || {})
  });
}

async function createVPC(options, region) {
  const fn = (obj) => new CreateVpcCommand(obj);
  const data = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, options || {})
  });

  if (data?.Vpc?.VpcId) {
    await assignTagParams(
      {
        Resources: [data.Vpc.VpcId],
        Tags: options.Tags
      },
      region
    );
  }

  return data?.Vpc;
}

async function getVPCByName(subnetName, region) {
  const fn = (obj) => new DescribeVpcsCommand(obj);
  const data = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, {
      Filters: [{ Name: 'tag:Name', Values: [subnetName] }]
    })
  });
  return data?.Vpcs[0];
}

async function createSubnet(options, region) {
  const fn = (obj) => new CreateSubnetCommand(obj);
  const data = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, options || {})
  });

  if (data?.Subnet?.SubnetId) {
    await assignTagParams(
      {
        Resources: [data.Subnet.SubnetId],
        Tags: options.Tags
      },
      region
    );
  }
  return data?.Subnet;
}

async function getSubnetByName(subnetName, region) {
  const fn = (obj) => new DescribeSubnetsCommand(obj);
  const data = await wrapper({
    $name: arguments.callee.name,
    region,
    fn: fn.bind(null, {
      Filters: [
        // { Name: 'availabilityZone', Values: [subnetName] },
        { Name: 'tag:Name', Values: [subnetName] }
      ]
    })
  });
  return data?.Subnets[0];
}

module.exports = {
  createEC2Instance,
  createSpotEC2Instance,

  getInstanceDataById,
  getInstances,

  createSecurityGroup,
  getSecurityGroups,

  assignSecurityGroupInboundRule,
  assignSecurityGroupOutboundRule,
  removeSecurityGroupOutboundRule,

  assignTagParams,

  // VPC
  createVPC,
  getVPCByName,

  // Subnet
  createSubnet,
  getSubnetByName
};
