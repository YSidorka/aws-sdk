const { PREFIX } = require('../common/config');

class SGClass {
  constructor(obj) {
    const {
      Region,
      Name,
      Description,
      IpProtocol,
      IpPermissions,
      IpPermissionsEgress,
      VpcId,
      VpcName,

      _obj
    } = obj;

    this.Region = Region || obj.region;

    this.Name = `${PREFIX}-${Name}`;
    this.GroupName = this.Name;
    this.Description = Description || '';
    this.IpProtocol = IpProtocol || 'tcp';

    this.IpPermissions = Array.isArray(IpPermissions) ? IpPermissions : [];
    this.IpPermissionsEgress = Array.isArray(IpPermissionsEgress) ? IpPermissionsEgress : [];

    this.VpcId = VpcId || null;
    this.VpcName = VpcName || null;
    Object.assign(this, _obj);
  }
}

module.exports = SGClass;
