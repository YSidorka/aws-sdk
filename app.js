const { describeAllInstances } = require('./ec2');

describeAllInstances().then(async (data) => {
  console.log(data[0]);
});
