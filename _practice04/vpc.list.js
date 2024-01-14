const { FRANKFURT } = require('../common/config');
const VPCClass = require('../ec2/vpc.class');

const vpcItems = {
  VPC_A: {
    Region: FRANKFURT,
    Name: 'vpc-a',
    CidrBlock: '10.5.0.0/16'
  },
  VPC_B: {
    Region: FRANKFURT,
    Name: 'vpc-b',
    CidrBlock: '10.15.0.0/16'
  }
};

const subnetItems = {
  SUBNET_A_PRIVATE: {
    Region: FRANKFURT,
    Name: 'subnet-a-private',
    CidrBlock: ''
  },
  SUBNET_A_PUBLIC: {
    Region: FRANKFURT,
    Name: 'subnet-a-public',
    CidrBlock: ''
  },
  SUBNET_B_PRIVATE: {
    Region: FRANKFURT,
    Name: 'subnet-b-private',
    CidrBlock: ''
  },
  SUBNET_B_PUBLIC: {
    Region: FRANKFURT,
    Name: 'subnet-b-public',
    CidrBlock: ''
  }
};

Object.keys(vpcItems).forEach((key) => vpcItems[key] = new VPCClass(vpcItems[key]));
// Object.keys(subnetItems).forEach((key) => subnetItems[key] = new SubnetClass(subnetItems[key]));

module.exports = {
  VPC_ITEMS: vpcItems,
  VPC_LIST: Object.values(vpcItems),

  SUBNET_ITEMS: subnetItems,
  SUBNET_LIST: Object.values(subnetItems)
}
