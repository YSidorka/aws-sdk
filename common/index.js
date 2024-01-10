const {
  getInstances,
  getSubnetByAZ,
  createEC2Instance,
  getSecurityGroups,
  createSecurityGroup,
  createSpotEC2Instance
} = require('../ec2');
const { createS3Bucket, getBucketByName } = require('../s3');

async function createInstances(list) {
  const result = [];
  try {
    for (let i = 0; i < list.length; i += 1) {
      const item = list[i];
      const [ec2] = await getInstances(
        {
          Filters: [{ Name: 'tag:Name', Values: [item.Name] }]
        },
        item.Region
      );

      if (ec2) {
        result.push(ec2);
        continue;
      }

      const subnet = await getSubnetByAZ(item.zone, item.Region);
      const ondemList = await createEC2Instance(
        {
          ...item,
          MinCount: 1,
          MaxCount: 1,
          SubnetId: subnet?.SubnetId || null
        },
        item.Region
      );

      result.push(...ondemList);
    }
    return result;
  } catch (err) {
    console.log('Error createInstances:', err);
    return result;
  }
}

async function createSpotInstances(list, price = '0.01', maxCount = 1) {
  const result = [];
  try {
    for (let i = 0; i < list.length; i += 1) {
      const item = list[i];

      const spotList = await createSpotEC2Instance(
        {
          ...item,
          SpotPrice: price,
          InstanceCount: maxCount
        },
        10000
      );

      if (Array.isArray(spotList)) {
        const ec2List = await getInstances(
          {
            InstanceIds: [...spotList.map(({ InstanceId }) => InstanceId)]
          },
          item.Region
        );
        result.push(...ec2List);
      }
    }
    return result;
  } catch (err) {
    console.log('Error createSpotInstances:', err);
    return result;
  }
}

async function createSecurityGroups(list) {
  const result = [];
  try {
    for (let i = 0; i < list.length; i += 1) {
      const item = list[i];
      let [sg] = await getSecurityGroups(
        {
          Filters: [{ Name: 'group-name', Values: [item.GroupName] }]
        },
        item.Region
      );

      if (!sg) sg = await createSecurityGroup({ ...item }, item.Region);
      if (sg) result.push(sg);
    }
    return result;
  } catch (err) {
    console.log('Error createSecurityGroups:', err);
    return result;
  }
}

async function createS3Buckets(list) {
  const result = [];
  try {
    for (let i = 0; i < list.length; i += 1) {
      const item = list[i];
      const bucket = await getBucketByName(item.Bucket);

      if (bucket) {
        result.push(bucket);
        continue;
      }

      const newBucket = await createS3Bucket({ ...item }, item.Region);

      if (newBucket) result.push(newBucket);
    }
    return result;
  } catch (err) {
    console.log('Error createS3Buckets:', err);
    return result;
  }
}

module.exports = {
  createInstances,
  createSpotInstances,
  createSecurityGroups,
  createS3Buckets
};
