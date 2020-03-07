const faker = require('faker');

faker.seed(101);
faker.locale = 'en_CA';

var data = [];

(() => {
  for(var i = 0; i < 100; i++) {
    data.push(faker.name.findName());
  }
})();

export default data;
