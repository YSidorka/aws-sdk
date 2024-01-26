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
      KeyName,

      ..._obj
    } = obj;

    this.Region = Region || obj.region;

    this.InstanceType = InstanceType || null;
    this.ImageId = ImageId || null;

    this.Name = `${PREFIX}-${Name}`;
    this.Tags = [{ Key: 'Name', Value: this.Name }];

    this.SubnetId = SubnetId || null;
    this.SubnetName = SubnetName || null;
    this.SecurityGroups = Array.isArray(SecurityGroups) ? [...SecurityGroups] : [];

    this.UserData = btoa(UserData || USER_DATA);
    this.KeyName = KeyName ? `${PREFIX}-${KeyName}` : null;

    Object.assign(this, _obj);
  }
}

module.exports = EC2Class;
