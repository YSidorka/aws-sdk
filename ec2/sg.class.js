const { PREFIX } = require('../common/config');

class SGClass {
  constructor(obj) {
    this.GroupName = obj.GroupName || `${PREFIX}-${obj.name}`;
    this.Description = obj.Description;
    this.IpProtocol = obj.IpProtocol || 'tcp';
    
    this.IpPermissions = [];
    this.IpPermissionsEgress = [];
    Object.assign(this, obj);
  }
}

module.exports = SGClass
