const {
  getInstances,
  getSubnetByAZ,
  createEC2Instance,
  getSecurityGroups,
  createSecurityGroup,
  createSpotEC2Instance
} = require('../ec2');

async function createInstances(list) {
  const result = [];
  try {
    for (let i = 0; i < list.length; i += 1) {
      const item = list[i];
      let [ec2] = await getInstances(
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

      const spotList = await createSpotEC2Instance({
        ...item,
        SpotPrice: price,
        InstanceCount: maxCount
      }, 10000);

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

module.exports = {
  createInstances,
  createSpotInstances,
  createSecurityGroups
};
