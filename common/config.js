const env = JSON.parse(process.env.AWS || '{}');

const AWS = initAWSConfig(env);

function initAWSConfig(obj) {
  return {
    credentials: {
      accessKeyId: obj.ACCESS_KEY_ID,
      secretAccessKey: obj.SECRET_KEY
    },
    region: obj.REGION,
    ec2image: obj.EC2_T2MICRO
  };
}

module.exports = {
  get AWS() {
    return AWS;
  },
  ...AWS
};
