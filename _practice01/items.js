const EC2Class = require('../ec2/ec2.class');
const { FRANKFURT, ZURICH } = require('../common/config');
const SGClass = require('../ec2/sg.class');

const instances = {
  't2micro-ui-euc1-a': {
    region: FRANKFURT,
    zone: `${FRANKFURT}a`,
    name: 't2-ui-a',
    ImageId: 'ami-0669b163befffbdfc'
  },
  // 't2micro-ui-euc1-b': {
  //   region: FRANKFURT,
  //   zone: `${FRANKFURT}b`,
  //   name: 't2-ui-b',
  //   ImageId: 'ami-0669b163befffbdfc'
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
    ImageId: 'ami-0b48feff5edeb9293'
  },
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
}

const securityGroups = {
  'sg-http-euc1': {
    name: `sg-http-euc1`,
    region: FRANKFURT,
    Description: `security group HTTP (${FRANKFURT})`,
    IpProtocol: 'tcp',
    FromPort: 80,
    ToPort: 80,
    IpRanges: [{ CidrIp: '0.0.0.0/0' }],
  },
  // 'sg-http-euc2': {
  //   name: `sg-http-euc2`,
  //   region: ZURICH,
  //   Description: 'security group HTTP (${ZURICH})',
  //   IpProtocol: 'tcp',
  //   FromPort: 80,
  //   ToPort: 80,
  //   IpRanges: [{ CidrIp: '0.0.0.0/0' }],
  // }
}

const targetGroups = {
  'tg-http-80': {
    Name: 'tg-http-80',
    Protocol: 'HTTP',
    Port: 80
  },
  'tg-http-3000': {
    Name: 'tg-http-3000',
    Protocol: 'HTTP',
    Port: 3000
  }
}

const appLoadBalancers = {
  'alb-euc1': {
    Name: 'alb-euc1',
    Subnets: [],
    SecurityGroups: []
  }
}

module.exports = {
  FRANKFURT,
  ZURICH,

  get EC2_LIST() {
    return Object.values(instances).map((item) => new EC2Class(item));
  },

  get SG_LIST() {
    return Object.values(securityGroups).map((item) => new SGClass(item));
  },

  get TG_LIST() {
    return Object.values(targetGroups).map((item) => item);
  },

  get ALB_LIST() {
    return Object.values(appLoadBalancers).map((item) => item);
  }
}

