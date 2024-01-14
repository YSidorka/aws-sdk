const { createSecurityGroups, createInstances, createVPCs, createSubnets } = require('../common');

const { EC2_LIST } = require('./ec2.list');
const { VPC_LIST } = require('./vpc.list');
const { SG_LIST } = require('./sg.list');
const { SUBNET_LIST } = require('./subnet.list');

async function init() {
  try {
    const vpcList = await createVPCs(VPC_LIST);
    const subnetList = await createSubnets(SUBNET_LIST);

    const sgList = await createSecurityGroups(SG_LIST);

    EC2_LIST.forEach((ec2) => {
      ec2.SecurityGroupIds = ec2.SecurityGroups.map((name) => {
        const sg = sgList.find((item) => item.GroupName === name);
        return sg?.GroupId;
      });
      ec2.SecurityGroupIds = ec2.SecurityGroupIds.filter((item) => !!item);
      delete ec2.SecurityGroups;
    });
    const ec2List = await createInstances(EC2_LIST);

    console.log(vpcList);
    console.log(subnetList);
    console.log(sgList);
    console.log(ec2List);
  } catch (err) {
    console.log('Error:', err);
  }
}

module.exports = init;
