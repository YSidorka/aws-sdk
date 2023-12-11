const { EC2_LIST, SG_LIST } = require('./_practice01/items');
const {
  createInstances,
  createSecurityGroups
} = require('./common/utils');

const sgList = [];
const ec2List = [];

// createSecurityGroups(SG_LIST).then((result) => {
//   sgList.push(...result);
//   console.log(sgList.length);
// });
//
// createInstances(EC2_LIST).then(result => {
//   ec2List.push(...result);
//   console.log(ec2List.length);
// });
