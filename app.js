const { ec2image } = require('./common/config').AWS;
const { createEC2Instance } = require('./ec2');

createEC2Instance({
  ...ec2image,
  MinCount: 1,
  MaxCount: 1
});
