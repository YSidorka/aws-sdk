const { FRANKFURT, T2_MICRO } = require('../common/config');
const EC2Class = require('../ec2/ec2.class');

const {
  SG_SSH_EUC1_A,
  SG_SSH_EUC1_B
} = require('./sg.list').SG_ITEMS;

const {
  SUBNET_A_PRIVATE,
  SUBNET_A_PUBLIC,
  SUBNET_B_PRIVATE,
  SUBNET_B_PUBLIC
} = require('./subnet.list').SUBNET_ITEMS;

const items = {
  't2micro-api-euc1-a-private': {
    Region: FRANKFURT,
    SubnetName: SUBNET_A_PRIVATE.Name,

    Name: 't2-api-a-private',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: [SG_SSH_EUC1_A.Name]
  },

  't2micro-api-euc1-a-public': {
    Region: FRANKFURT,
    SubnetName: SUBNET_A_PUBLIC.Name,

    Name: 't2-api-a-public',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: [SG_SSH_EUC1_A.Name]
  },

  't2micro-api-euc1-b-private': {
    Region: FRANKFURT,
    SubnetName: SUBNET_B_PRIVATE.Name,

    Name: 't2-api-b-private',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: [SG_SSH_EUC1_B.Name]
  },

  't2-api-euc1-b-public': {
    Region: FRANKFURT,
    SubnetName: SUBNET_B_PUBLIC.Name,

    Name: 't2-api-b-public',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: [SG_SSH_EUC1_B.Name]
  }
};

Object.keys(items).forEach((key) => (items[key] = new EC2Class(items[key])));

module.exports = {
  EC2_ITEMS: items,
  EC2_LIST: Object.values(items)
};
