const { FRANKFURT, ZURICH } = require('../common/config');
const EC2Class = require('../ec2/ec2.class');

const items = {
  't2micro-ui-euc1-a': {
    region: FRANKFURT,
    zone: `${FRANKFURT}a`,
    name: 't2-ui-a',
    ImageId: 'ami-0669b163befffbdfc',
    SecurityGroups: ['sg-http-euc1']
  },

  // 't2micro-ui-euc1-b': {
  //   region: FRANKFURT,
  //   zone: `${FRANKFURT}b`,
  //   name: 't2-ui-b',
  //   ImageId: 'ami-0669b163befffbdfc',
  //   SecurityGroups: ['sg-http-euc1']
  // },
  // 't2micro-api-euc1-a': {
  //   region: FRANKFURT,
  //   zone: `${FRANKFURT}a`,
  //   name: 't2-api-a',
  //   ImageId: 'ami-0669b163befffbdfc'
  // },
  // 't2micro-api-euc1-b': {
  //   region: FRANKFURT,
  //   zone: `${FRANKFURT}b`,
  //   name: 't2-api-b',
  //   ImageId: 'ami-0669b163befffbdfc'
  // },

  't3micro-ui-euc2-a': {
    region: ZURICH,
    zone: `${ZURICH}a`,
    name: 't3-ui-a',
    InstanceType: 't3.micro',
    ImageId: 'ami-0b48feff5edeb9293',
    SecurityGroups: ['sg-http-euc2']
  }

  // 't3micro-ui-euc2-b': {
  //   region: ZURICH,
  //   zone: `${ZURICH}b`,
  //   name: 't3-ui-b',
  //   InstanceType: 't3.micro',
  //   ImageId: 'ami-0b48feff5edeb9293'
  // },
  // 't3micro-api-euc2-a': {
  //   region: ZURICH,
  //   zone: `${ZURICH}a`,
  //   name: 't3-api-a',
  //   InstanceType: 't3.micro',
  //   ImageId: 'ami-0b48feff5edeb9293'
  // },
  // 't3micro-api-euc2-b': {
  //   region: ZURICH,
  //   zone: `${ZURICH}b`,
  //   name: 't3-api-b',
  //   InstanceType: 't3.micro',
  //   ImageId: 'ami-0b48feff5edeb9293'
  // }
};
module.exports = Object.values(items).map((item) => new EC2Class(item));
