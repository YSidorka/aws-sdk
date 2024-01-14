const { FRANKFURT, ZURICH } = require('../common/config');
const SGClass = require('../ec2/sg.class');

const items = {
  'SG_EC2_EUC1': {
    Name: `sg-ec2-euc1`,
    Region: FRANKFURT,
    Description: `security group EC2 (${FRANKFURT})`,
    IpPermissions: []
  },
  'SG_HTTP_EUC1': {
    Name: `sg-http-euc1`,
    Region: FRANKFURT,
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
  },
  'SG_SSH_EUC1': {
    Name: `sg-ssh-euc1`,
    Region: FRANKFURT,
    Description: `security group SSH (${FRANKFURT})`,
    IpPermissions: [
      {
        IpProtocol: 'tcp',
        FromPort: 22,
        ToPort: 22,
        IpRanges: [{ CidrIp: '0.0.0.0/0' }]
      }
    ]
  },
  // 'SG_FROM_SG': {
  //   Name: `sg-from-sg`,
  //   Region: FRANKFURT,
  //   Description: `traffic from another security group (${FRANKFURT})`,
  //   IpPermissions: [
  //     // SG for this case should be created before
  //     // {
  //     //   IpProtocol: '-1',
  //     //   UserIdGroupPairs: [{ GroupId: sourceSecurityGroupId }]
  //     // }
  //   ]
  // },

  // 'SG_HTTP_EUC2': {
  //   Name: `sg-http-euc2`,
  //   Region: ZURICH,
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

Object.keys(items).forEach((key) => items[key] = new SGClass(items[key]));

module.exports = {
  get SG_ITEMS() { return items },
  get SG_LIST() { return Object.values(items) }
};
