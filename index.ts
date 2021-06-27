import { EvaluatePerformance } from './performance-checker';
import { testData } from './test-data';
import * as _ from 'underscore';

console.log('test data length', testData.length);

class PerformanceTest {
  constructor() {}

  @EvaluatePerformance({
    resultColor: 'yellow'
  })
  groupWithPlainJavaScript() {
    const result = testData.reduce((group, current) => {
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
    const result = _.groupBy(testData, 'company');
    return result;
  }
}
