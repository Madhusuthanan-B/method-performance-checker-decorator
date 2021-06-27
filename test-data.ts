import * as faker from 'faker';

const facebookEmployees = [];
const googleEmployees = [];
const microSoftEmployees = [];

for (let i = 1; i <= 500; i++) {
  facebookEmployees.push({
    name: faker.name.findName(),
    company: 'facebeook',
    id: faker.datatype.number()
  });
  googleEmployees.push({
    name: faker.name.findName(),
    company: 'google',
    id: faker.datatype.number()
  });
  microSoftEmployees.push({
    name: faker.name.findName(),
    company: 'microsoft',
    id: faker.datatype.number()
  });
}

export const testData = [
  ...facebookEmployees,
  ...googleEmployees,
  ...microSoftEmployees
];
