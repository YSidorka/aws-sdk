const { FRANKFURT, ZURICH } = require('../common/config');
const SGClass = require('../ec2/sg.class');

const items = {
  'sg-ec2-euc1': {
    name: `sg-ec2-euc1`,
    region: FRANKFURT,
    Description: `security group EC2 (${FRANKFURT})`,
    IpPermissions: []
  },
  'sg-http-euc1': {
    name: `sg-http-euc1`,
    region: FRANKFURT,
    Description: `security group HTTP (${FRANKFURT})`,
    IpPermissions: [
      {
        IpProtocol: 'tcp',
        FromPort: 80,
        ToPort: 80,
        IpRanges: [{ CidrIp: '0.0.0.0/0' }]
      }
    ]
    // IpPermissionsEgress: [
    //   {
    //     IpProtocol: "tcp",
    //     FromPort: 80,
    //     ToPort: 80,
    //     IpRanges: [{ CidrIp: "0.0.0.0/0" }]
    //   }
    // ]
  }
  // 'sg-ssh-euc1': {
  //   name: `sg-ssh-euc1`,
  //   region: FRANKFURT,
  //   Description: `security group SSH (${FRANKFURT})`,
  //   IpPermissions: [
  //     {
  //       IpProtocol: 'tcp',
  //       FromPort: 22,
  //       ToPort: 22,
  //       IpRanges: [{ CidrIp: '0.0.0.0/0' }]
  //     }
  //   ]
  // },
  // 'sg-from-sg': {
  //   name: `sg-from-sg`,
  //   region: FRANKFURT,
  //   Description: `traffic from another security group (${FRANKFURT})`,
  //   IpPermissions: [
  //     // SG for this case should be created before
  //     // {
  //     //   IpProtocol: '-1',
  //     //   UserIdGroupPairs: [{ GroupId: sourceSecurityGroupId }]
  //     // }
  //   ]
  // },

  // 'sg-http-euc2': {
  //   name: `sg-http-euc2`,
  //   region: ZURICH,
  //   Description: `security group HTTP (${ZURICH})`,
  //   IpPermissions: [
  //     {
  //       IpProtocol: 'tcp',
  //       FromPort: 80,
  //       ToPort: 80,
  //       IpRanges: [{ CidrIp: '0.0.0.0/0' }]
  //     }
  //   ]
  // }
};

module.exports = Object.values(items).map((item) => new SGClass(item));
