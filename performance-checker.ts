type ResultUnit = 'milliseconds' | 'seconds';
interface IPerformanceOptions {
  resultUnit: ResultUnit;
  resultColor: string;
}

export function EvaluatePerformance(options?: Partial<IPerformanceOptions>) {
  return (
    target: Object,
    property: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    const resultColor = options?.resultColor || 'yellow';
    console.log('Started Evaluation');
    const actualMethod: Function = propertyDescriptor.value;
    (function(...args) {
      const tStart = performance.now();
      actualMethod.apply(this, args);
      const tEnd = performance.now();
      const ms = tEnd - tStart;
      const style = `background: black; color: ${resultColor}; font-weight: bold`;
      if (options && options.resultUnit === 'seconds') {
        const seconds = (ms / 1000).toFixed(4);
        console.log(`%c ${property} => ${seconds} seconds`,style);
      } else {
        console.log(`%c ${property} => ${ms} milliseconds`, style);
      }
    })();
  };
}
