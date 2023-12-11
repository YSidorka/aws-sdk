const { getInstances, getSubnetByAZ, createEC2Instance, assignTagParams, getSecurityGroups } = require('../ec2');

async function sleep(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time)); // eslint-disable-line
}

async function createInstances(list) {
  const result = [];
  try {
    for (let i = 0; i < list.length; i++) {

      const item = list[i];
      let [ec2] = await getInstances({
        Filters: [{ Name: 'tag:Name', Values: [item.Name] }]
      }, item.region);

      if (ec2) {
        result.push(ec2);
        continue;
      }

      const subnet = await getSubnetByAZ(item.zone, item.region);
      ec2 = await createEC2Instance({
        ...item,
        MinCount: 1,
        MaxCount: 1,
        SubnetId: subnet?.SubnetId || null
      }, item.region);


      if (!ec2 || !Array.isArray(ec2.Instances)) {
        console.log('Item not created:', JSON.stringify(item));
        continue;
      }

      // assign Tags / Names
      await assignTagParams({
        Resources: ec2.Instances.map(instance => instance.InstanceId),
        Tags: item.Tags,
      }, item.region);

      result.push(...ec2.Instances);
    }
    return result;
  } catch (err) {
    console.log('Error createInstances:', err);
    return result;
  }
}
module.exports = {
  sleep,
  createInstances,
};
