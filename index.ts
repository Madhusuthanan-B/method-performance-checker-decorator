import { EvaluatePerformance } from './performance-checker';

class PerformanceTest {
  constructor() {}

  @EvaluatePerformance({
    resultColor: 'red'
  })
  longRunner() {
    for (let i = 0; i < 200; i++) {
      const fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
      fruits.sort();
    }
  }

  @EvaluatePerformance({
    resultColor: 'yellow'
  })
  testMethod() {
    for (let i = 0; i < 500; i++) {
      const fruits = ['Banana', 'Orange', 'Apple', 'Mango', 'a', 'b', 'c'];
      fruits.sort();
    }
  }
}
