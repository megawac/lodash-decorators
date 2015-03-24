import has from 'lodash/object/has';
import reduce from 'lodash/internal/arrayReduce';

let lodashDecorators = [
  'after', 'before', 'curry', 'curryRight', 'debounce',
  'memoize', 'negate', 'once', 'spread', 'throttle'
];

export function createDecorator(decoratorFunc) {
  return function wrapDecorator(...args) {
    return function decorator(target, name, descriptor) {
      let {get, set, value} = descriptor;
      if (typeof get === "function") {
        descriptor.get = decoratorFunc(get, ...args);
      }
      else if (typeof set === "function") {
        descriptor.set = decoratorFunc(set, ...args);
      }
      else if (typeof value === "function") {
        descriptor.value = decoratorFunc(value, ...args);
      }
      return descriptor;
    };
  };
}

export default function mixin(_instance) {
  let decorators = reduce(lodashDecorators, (memo, method) => {
    if (has(_instance, method)) {
      memo[method] = createDecorator(_instance[method]);
    }
    return memo;
  }, {});
  
  let {bind} = _instance;
  if (typeof bind === 'function') {
    decorators.autobind = createDecorator(function(fn) {
      return bind(fn, this);
    });
  }

  return decorators;
}
