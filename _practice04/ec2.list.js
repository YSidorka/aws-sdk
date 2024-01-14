const { FRANKFURT, T2_MICRO } = require('../common/config');
const EC2Class = require('../ec2/ec2.class');

const {
  SG_SSH_EUC1_A,
  SG_SSH_EUC1_B
} = require('./sg.list').SG_ITEMS;


const items = {
  't2micro-api-euc1-a-private': {
    Region: FRANKFURT,
    SubnetName: 'sky-subnet-a-private',

    Name: 't2-api-a-private',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: [SG_SSH_EUC1_A.Name]
  },

  't2micro-api-euc1-a-public': {
    Region: FRANKFURT,
    SubnetName: 'sky-subnet-a-public',

    Name: 't2-api-a-public',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: [SG_SSH_EUC1_A.Name]
  },

  't2micro-api-euc1-b-private': {
    Region: FRANKFURT,
    SubnetName: 'sky-subnet-b-private',

    Name: 't2-api-b-private',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: [SG_SSH_EUC1_B.Name]
  },

  't2-api-euc1-b-public': {
    Region: FRANKFURT,
    SubnetName: 'sky-subnet-b-public',

    Name: 't2-api-b-public',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: [SG_SSH_EUC1_B.Name]
  }
};

Object.keys(items).forEach((key) => items[key] = new EC2Class(items[key]));

module.exports = {
  get EC2_ITEMS() { return items },
  get EC2_LIST() { return Object.values(items) }
}
