const { PREFIX } = require('../common/config');

class S3Class {
  constructor(obj) {
    const {
      Region,
      Name,
      Tags,

      ..._obj
    } = obj;

    this.Region = Region || obj.region;
    this.Bucket = `${PREFIX}-${Name}`;

    this.Tags = [{ Key: 'Name', Value: this.Bucket }];

    Object.assign(this, _obj);
  }
}

module.exports = S3Class;
