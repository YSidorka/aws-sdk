const { FRANKFURT, ZURICH } = require('../common/config');
const SGClass = require('../ec2/sg.class');

const items = {
  'sg-http-euc1': {
    name: `sg-http-euc1`,
    region: FRANKFURT,
    Description: `security group HTTP (${FRANKFURT})`,
    IpPermissions: [{
      IpProtocol: 'tcp',
      FromPort: 80,
      ToPort: 80,
      IpRanges: [{ CidrIp: "0.0.0.0/0" }]
    }],
    // IpPermissionsEgress: [
    //   {
    //     IpProtocol: "tcp",
    //     FromPort: 80,
    //     ToPort: 80,
    //     IpRanges: [{ CidrIp: "0.0.0.0/0" }]
    //   }
    // ]
  },
  'sg-http-euc2': {
    name: `sg-http-euc2`,
    region: ZURICH,
    Description: `security group HTTP (${ZURICH})`,
    IpPermissions: [{
      IpProtocol: 'tcp',
      FromPort: 80,
      ToPort: 80,
      IpRanges: [{ CidrIp: "0.0.0.0/0" }]
    }]
  }
}

module.exports = Object.values(items).map((item) => new SGClass(item));
