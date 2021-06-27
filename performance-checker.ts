type ResultUnit = 'milliseconds' | 'seconds';

interface IPerformanceOptions {
  resultUnit: ResultUnit;
  resultColor: string;
  requiredNoOfExecutions: number;
  enableTrace: boolean
}

/**
 * @param options Supplies configuration metadata to control how the performance is evaluated
 * @param options.resultUnit To view the result in milliseconds (or) seconds
 * @param options.resultColor Result color to be viewed in browser console
 * @param options.requiredNoOfExecutions Controls the number of executions of your actual method
 * @param options.enableTrace  To view internal trace
 */
export function EvaluatePerformance(options?: Partial<IPerformanceOptions>) {
  return (
    target: Object,
    property: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    const resultColor = options?.resultColor || 'yellow';
    const noOfExecutions = options?.requiredNoOfExecutions  || 20;
    const style = `background: black; color: ${resultColor};font-size: 14px`;
    const isTraceEnabled = options?.enableTrace;
    const actualMethod: Function = propertyDescriptor.value;
    const metrics = [];
    for(let i =1; i<=noOfExecutions; i++) {
      (function(...args) {
        const tStart = performance.now();
        actualMethod.apply(this, args);
        const tEnd = performance.now();
        const ms = tEnd - tStart;
        metrics.push(ms);
      })();
    }

    const total = metrics.reduce((sum, m) => {
      sum = sum+m;
      return sum;
    }, 0);

    const meanPerformanceInMs = total/metrics.length;

    if(isTraceEnabled) {
      console.log('Total metrics', metrics.length);
    }

    if (options && options.resultUnit === 'seconds') {
        const seconds = (meanPerformanceInMs / 1000).toFixed(4);
        console.log(`%c Avg execution time (${noOfExecutions} executions) for ${property} => ${seconds} seconds`,style);
    } else {
        console.log(`%c Avg execution time (${noOfExecutions} executions) for ${property} => ${meanPerformanceInMs} milliseconds`, style);
      }
  };
}
