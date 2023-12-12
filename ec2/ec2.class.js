const { TYPE, IMAGE_ID, PREFIX, USER_DATA } = require('../common/config');

class EC2Class {
  constructor(obj) {
    const {
      Region,
      InstanceType,
      ImageId,
      Name,
      Tags,
      SecurityGroups,
      UserData,

      ..._obj
    } = obj;

    this.Region = Region || obj.region;

    this.InstanceType = obj.InstanceType/* || TYPE*/;
    this.ImageId = obj.ImageId/* || IMAGE_ID*/;

    this.Name = `${PREFIX}-${obj.name}` || '';
    this.Tags = [ { Key: 'Name', Value: `${PREFIX}-${obj.name}` }];

    this.SecurityGroups = Array.isArray(obj.SecurityGroups) ? obj.SecurityGroups.map((name) => `${PREFIX}-${name}`) : [];

    this.UserData = btoa(obj.UserData || USER_DATA);
    Object.assign(this, _obj);
  }
}

module.exports = EC2Class
