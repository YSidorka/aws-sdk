const { FRANKFURT } = require('../common/config');
const VPCClass = require('../ec2/vpc.class');

const items = {
  VPC_A: {
    Region: FRANKFURT,
    Name: 'vpc-A',
    CidrBlock: '10.5.0.0/16'
  },
  VPC_B: {
    Region: FRANKFURT,
    Name: 'vpc-B',
    CidrBlock: '10.15.0.0/16'
  }
};

Object.keys(items).forEach((key) => (items[key] = new VPCClass(items[key])));

module.exports = {
  VPC_ITEMS: items,
  VPC_LIST: Object.values(items)
};
