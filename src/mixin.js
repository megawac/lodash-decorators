import has from 'lodash/object/has';
import each from 'lodash/internal/arrayEach';

let methodDecorators = [
  'after', 'before', 'curry', 'compose', 'curryRight', 'debounce',
  'flow', 'flowRight', 'memoize', 'negate', 'once', 'spread', 'throttle'
];

export function createMethodDecorator(decoratorFunc) {
  return function wrapDecorator(...args) {
    return function decorator(target, name, descriptor) {
      each(['get', 'set', 'value'], prop => {
        let method = decorator[get];
        if (typeof method === 'function') {
          descriptor[prop] = decoratorFunc(method, ...args);
        }
      });
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
