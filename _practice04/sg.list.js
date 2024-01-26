const { FRANKFURT } = require('../common/config');
const SGClass = require('../ec2/sg.class');
const { VPC_A, VPC_B } = require('./vpc.list').VPC_ITEMS;

const items = {
  SG_SSH_EUC1_A: {
    Name: `sg-ssh-euc1-a`,
    Region: FRANKFURT,
    VpcName: VPC_A.Name,
    Description: `security group SSH VPC A (${FRANKFURT})`,
    IpPermissions: [
      {
        IpProtocol: 'tcp',
        FromPort: 22,
        ToPort: 22,
        IpRanges: [{ CidrIp: '0.0.0.0/0' }]
      }
    ]
  },
  // SG_SSH_EUC1_B: {
  //   Name: `sg-ssh-euc1-b`,
  //   Region: FRANKFURT,
  //   VpcName: VPC_B.Name,
  //   Description: `security group SSH VPC B (${FRANKFURT})`,
  //   IpPermissions: [
  //     {
  //       IpProtocol: 'tcp',
  //       FromPort: 22,
  //       ToPort: 22,
  //       IpRanges: [{ CidrIp: '0.0.0.0/0' }]
  //     }
  //   ]
  // },
  // SG_HTTP_EUC1_A: {
  //   Name: `sg-http-euc1-a`,
  //   Region: FRANKFURT,
  //   VpcName: VPC_A.Name,
  //   Description: `security group HTTP VPC A (${FRANKFURT})`,
  //   IpPermissions: [
  //     {
  //       IpProtocol: 'tcp',
  //       FromPort: 80,
  //       ToPort: 80,
  //       IpRanges: [{ CidrIp: '0.0.0.0/0' }]
  //     }
  //   ]
  // },
  // SG_HTTP_EUC1_B: {
  //   Name: `sg-http-euc1-b`,
  //   Region: FRANKFURT,
  //   VpcName: VPC_B.Name,
  //   Description: `security group HTTP VPC B (${FRANKFURT})`,
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

Object.keys(items).forEach((key) => (items[key] = new SGClass(items[key])));

module.exports = {
  SG_ITEMS: items,
  SG_LIST: Object.values(items)
};
