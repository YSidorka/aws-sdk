const { FRANKFURT, ZURICH } = require('../common/config');
const LambdaClass = require('../lambda/lambda.class');

const items = {
  'lambda-getProducts-euc1': {
    Name: `lambda-getProducts-euc1`,
    Region: FRANKFURT,

    Runtime: 'nodejs20.x',
    Role: '',
    Handler: 'index.handler'
  }
};

module.exports = Object.values(items).map((item) => new LambdaClass(item));
