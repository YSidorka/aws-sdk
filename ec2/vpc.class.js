const { PREFIX } = require('../common/config');

class VPCClass {
  constructor(obj) {
    const {
      Region,
      Name,
      CidrBlock,
      _obj
    } = obj;

    this.Region = Region || obj.region;
    this.Name = `${PREFIX}-${Name}`;
    this.Tags = [{ Key: 'Name', Value: this.Name }];

    this.CidrBlock = CidrBlock || '10.0.0.0/0';
  }
}

module.exports = VPCClass;
