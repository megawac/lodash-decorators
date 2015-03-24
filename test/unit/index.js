import {after, before, curry, curryRight, debounce, memoize, negate, once, throttle} from '../../src/index';

class DecoratedClass {

  @after(3)
  after3() {
    this.notifier('After has been called');
  }

  @before(3)
  before3() {
    this.notifier('Before has been called');
  }

  @curry
  curry(a, b, c) {
    this.notifier('Curry called with ', a, b, c);
  }

  @curryRight
  curryRight(a, b, c) {
    this.notifier('curryRight called with ', a, b, c);
  }

  @debounce(1000)
  debounce() {
    this.notifier('Debounce called');
  }

  @memoize
  memoize(a, b) {
    this.notifier('Memoize called with', a, b);
  }

  @negate
  get negate() {
    this.notifier('Getter negate was called');
    return false;
  }

  @once
  get once() {
    this.notifier('Get once was called');
  }

  @once
  set once() {
    this.notifier('Set once was called');
  }

  @throttle(1000, {leading: false})
  throttle() {
    this.notifier('Throttle was called');
  }

  notifier() {
    console.log(arguments);
  }
};

describe('A feature test', () => {
  // Todo
});
