import has from 'lodash/object/has';
import each from 'lodash/internal/arrayEach';

let methodDecorators = [
  'after', 'before', 'curry', 'compose', 'curryRight', 'debounce',
  'flow', 'flowRight', 'memoize', 'negate', 'once', 'spread', 'throttle'
];

export function createMethodDecorator(decoratorFunc) {
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
  let decorators = {};
  
  let {bind} = _instance;
  if (typeof bind === 'function') {
    decorators.autobind = createMethodDecorator(fn => function autobind() {
      return bind(fn, this);
    });
  }

  each(methodDecorators, (method) => {
    if (has(_instance, method)) {
      decorators[method] = createMethodDecorator(_instance[method]);
    }
  });

  return decorators;
}
