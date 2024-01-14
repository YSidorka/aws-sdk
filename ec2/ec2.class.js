const { PREFIX, USER_DATA } = require('../common/config');

class EC2Class {
  constructor(obj) {
    const {
      Region,
      SubnetId,
      SubnetName,

      Name,
      InstanceType,
      ImageId,
      Tags,
      SecurityGroups,
      UserData,

      ..._obj
    } = obj;

    this.Region = Region || obj.region;

    this.InstanceType = obj.InstanceType || null;
    this.ImageId = obj.ImageId || null;

    this.Name = `${PREFIX}-${obj.Name}` || '';
    this.Tags = [{ Key: 'Name', Value: this.Name }];

    this.SubnetId = obj.SubnetId || null;
    this.SubnetName = obj.SubnetName || null;
    this.SecurityGroups = Array.isArray(obj.SecurityGroups)
      ? obj.SecurityGroups.map((name) => `${PREFIX}-${name}`)
      : [];

    this.UserData = btoa(obj.UserData || USER_DATA);
    Object.assign(this, _obj);
  }
}

module.exports = EC2Class;
