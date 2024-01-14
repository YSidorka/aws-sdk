const { FRANKFURT, ZURICH, T3_MICRO, T2_MICRO } = require('../common/config');
const EC2Class = require('../ec2/ec2.class');
const {
  SG_EC2_EUC1,
  SG_SSH_EUC1,
  SG_HTTP_EUC1
} = require('./sg.list').SG_ITEMS;

const items = {
  't2micro-ui-euc1-a': {
    Region: FRANKFURT,
    SubnetName: `${FRANKFURT}a`,

    Name: 't2-ui-a',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: [SG_EC2_EUC1.Name, SG_HTTP_EUC1.Name]
  },
  't2micro-ui-euc1-b': {
    Region: FRANKFURT,
    SubnetName: `${FRANKFURT}b`,

    Name: 't2-ui-b',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: [
      SG_EC2_EUC1.Name,
      SG_SSH_EUC1.Name
    ]
  },
  't2micro-api-euc1-a': {
    Region: FRANKFURT,
    SubnetName: `${FRANKFURT}a`,

    Name: 't2-api-a',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: [SG_EC2_EUC1.Name]
  },
  't2micro-api-euc1-b': {
    Region: FRANKFURT,
    SubnetName: `${FRANKFURT}b`,

    Name: 't2-api-b',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: [
      SG_EC2_EUC1.Name,
      SG_SSH_EUC1.Name
    ]
  },

  // 't3micro-ui-euc2-a': {
  //   Region: ZURICH,
  //   SubnetName: `${ZURICH}a`,
  //
  //   Name: 't3-ui-a',
  //   InstanceType: T3_MICRO,
  //   ImageId: 'ami-0b48feff5edeb9293',
  //   SecurityGroups: ['sg-http-euc2']
  // },
  // 't3micro-ui-euc2-b': {
  //   Region: ZURICH,
  //   SubnetName: `${ZURICH}b`,
  //
  //   Name: 't3-ui-b',
  //   InstanceType: T3_MICRO,
  //   ImageId: 'ami-0b48feff5edeb9293',
  //   SecurityGroups: ['sg-http-euc2']
  // },
  // 't3micro-api-euc2-a': {
  //   Region: ZURICH,
  //   SubnetName: `${ZURICH}a`,
  //
  //   Name: 't3-api-a',
  //   InstanceType: T3_MICRO,
  //   ImageId: 'ami-0b48feff5edeb9293',
  //   SecurityGroups: ['sg-http-euc2']
  // },
  // 't3micro-api-euc2-b': {
  //   Region: ZURICH,
  //   SubnetName: `${ZURICH}b`,
  //
  //   Name: 't3-api-b',
  //   InstanceType: T3_MICRO,
  //   ImageId: 'ami-0b48feff5edeb9293',
  //   SecurityGroups: ['sg-http-euc2']
  // }
};

Object.keys(items).forEach((key) => items[key] = new EC2Class(items[key]));

module.exports = {
  get EC2_ITEMS() { return items },
  get EC2_LIST() { return Object.values(items) }
}
