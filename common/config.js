const USER_DATA = require('./user-data')[0];

const env = JSON.parse(process.env.AWS || '{}');

const AWS = initAWSConfig(env);

function initAWSConfig(obj) {
  return {
    PREFIX: obj.PREFIX,
    credentials: {
      accessKeyId: obj.ACCESS_KEY_ID,
      secretAccessKey: obj.SECRET_KEY
    },
    defaultRegion: obj.REGION
  };
}

module.exports = {
  get AWS() {
    return AWS;
  },
  ...AWS,

  TYPE: 't2.micro',
  IMAGE_ID: 'ami-0669b163befffbdfc',
  // IMAGE_ID: 'ami-0416c18e75bd69567', Europe (Stockholm)
  // IMAGE_ID: 'ami-0b48feff5edeb9293', Europe (Zurich)

  FRANKFURT: 'eu-central-1',
  ZURICH: 'eu-central-2',
  PARIS: 'eu-west-3',

  USER_DATA
};
