const { PREFIX } = require('../common/config');

class SGClass {
  constructor(obj) {
    const {
      Region,
      GroupName,
      Description,
      IpProtocol,
      IpPermissions,
      IpPermissionsEgress,
      name,
      _obj
    } = obj;

    this.Region = Region || obj.region;

    this.GroupName = GroupName || `${PREFIX}-${name}`;
    this.Description = Description || '';
    this.IpProtocol = IpProtocol || 'tcp';

    this.IpPermissions = Array.isArray(IpPermissions) ? IpPermissions : [];
    this.IpPermissionsEgress = Array.isArray(IpPermissionsEgress) ? IpPermissionsEgress : [];
    Object.assign(this, _obj);
  }
}

module.exports = SGClass;
