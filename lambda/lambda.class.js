const { PREFIX } = require('../common/config');

class LambdaClass {
  constructor(obj) {
    const {
      Region,
      Name,
      Runtime,
      Role, // required
      Handler,

      Tags,
      Architectures,
      ..._obj
    } = obj;

    this.Region = Region || obj.region;

    this.FunctionName = `${PREFIX}-${obj.Name}`;
    this.Runtime = Runtime || 'nodejs20.x';
    this.Role = Role;
    this.Handler = Handler || 'index.handler';

    this.Tags = [{ Key: 'Name', Value: this.FunctionName }];
    this.Architectures = Architectures || ['x86_64'];

    Object.assign(this, _obj);
  }
}

module.exports = LambdaClass;
