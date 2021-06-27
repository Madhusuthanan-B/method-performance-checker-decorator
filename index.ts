import { EvaluatePerformance } from './performance-checker';
import * as _ from 'underscore';

const rawData = [
  { company: 'facebeook', name: 'Steve', id: 1988 },
  { company: 'microsoft', name: 'Sathya', id: 8785 },
  { company: 'facebeook', name: 'Rob', id: 1921 },
  { company: 'facebeook', name: 'Smith', id: 1954 },
  { company: 'google', name: 'Wills', id: 2021 },
  { company: 'facebeook', name: 'Robin', id: 1991 },
  { company: 'facebeook', name: 'Meridith', id: 1964 },
  { company: 'google', name: 'Sundar', id: 2054 },
  { company: 'google', name: 'Ajay', id: 2087 },
  { company: 'facebeook', name: 'Bob', id: 1932 },
  { company: 'microsoft', name: 'Bill', id: 8888 },
  { company: 'google', name: 'Faf', id: 2014 },
  { company: 'microsoft', name: 'Rocky', id: 8000 }
];

class PerformanceTest {
  constructor() {}

  @EvaluatePerformance({
    resultColor: 'yellow'
  })
  groupWithPlainJavaScript() {
    const result = rawData.reduce((group, current) => {
      if (group[current.company]) {
        group[current.company].push(current);
      } else {
        group[current.company] = [current];
      }
      return group;
    }, {});
    return result;
  }

  @EvaluatePerformance({
    resultColor: 'red'
  })
  groupWithUnderscore() {
    const result = _.groupBy(rawData, 'company');
    return result;
  }
}
