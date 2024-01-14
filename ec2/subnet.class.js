const { PREFIX } = require('../common/config');

class SubnetClass {
  constructor(obj) {
    const {
      Region,
      Name,
      CidrBlock,
      VpcId,
      VpcName,

      _obj
    } = obj;

    this.Region = Region || obj.region;
    this.Name = `${PREFIX}-${Name}`;
    this.Tags = [{ Key: 'Name', Value: this.Name }];

    this.CidrBlock = CidrBlock || '10.0.0.0/0';
    this.VpcId = VpcId || null;
    this.VpcName = VpcName || null;
  }
}

module.exports = SubnetClass;
