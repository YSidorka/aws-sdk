const { FRANKFURT, ZURICH, T3_MICRO, T2_MICRO } = require('../common/config');
const EC2Class = require('../ec2/ec2.class');

const items = {
  't2micro-ui-euc1-a': {
    Region: FRANKFURT,
    SubnetName: `${FRANKFURT}a`,

    Name: 't2-ui-a',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: ['sg-ec2-euc1']
  },
  't2micro-ui-euc1-b': {
    Region: FRANKFURT,
    SubnetName: `${FRANKFURT}b`,

    Name: 't2-ui-b',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: ['sg-ec2-euc1', 'sg-ssh-euc1']
  },
  't2micro-api-euc1-a': {
    Region: FRANKFURT,
    SubnetName: `${FRANKFURT}a`,

    Name: 't2-api-a',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: ['sg-ec2-euc1']
  },
  't2micro-api-euc1-b': {
    Region: FRANKFURT,
    SubnetName: `${FRANKFURT}b`,

    Name: 't2-api-b',
    InstanceType: T2_MICRO,
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: ['sg-ec2-euc1', 'sg-ssh-euc1']
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
module.exports = Object.values(items).map((item) => new EC2Class(item));
