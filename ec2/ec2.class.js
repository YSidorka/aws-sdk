const { TYPE, IMAGE_ID, PREFIX, USER_DATA } = require('../common/config');

class EC2Class {
  constructor(obj) {
    this.InstanceType = obj.InstanceType/* || TYPE*/;
    this.ImageId = obj.ImageId/* || IMAGE_ID*/;

    this.Name = `${PREFIX}-${obj.name}` || '';
    this.Tags = [ { Key: 'Name', Value: `${PREFIX}-${obj.name}` }];

    this.UserData = btoa(obj.UserData || USER_DATA);
    Object.assign(this, obj);
  }
}

module.exports = EC2Class
