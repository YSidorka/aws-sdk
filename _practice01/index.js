const { createSecurityGroups, createInstances } = require('../common');

const { EC2_LIST } = require('./ec2.list');
const { SG_LIST } = require('./sg.list');

async function init() {
  try {
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

    console.log(ec2List);
  } catch (err) {
    console.log('Error:', err);
  }
}

module.exports = init;
