type ResultUnit = 'milliseconds' | 'seconds';
interface IPerformanceOptions {
  resultUnit: ResultUnit;
  resultColor: string;
  requiredNoOfExecutions: number;
  enableTrace: boolean
}

export function EvaluatePerformance(options?: Partial<IPerformanceOptions>) {
  return (
    target: Object,
    property: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    const resultColor = options?.resultColor || 'yellow';
    const noOfExecutions = options?.requiredNoOfExecutions  || 20;
    const style = `background: black; color: ${resultColor}; font-weight: bold`;
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
        console.log(`%c ${property} => ${seconds} seconds`,style);
    } else {
        console.log(`%c ${property} => ${meanPerformanceInMs} milliseconds`, style);
      }
  };
}
