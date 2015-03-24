# lodash-decorators

As [the ES7 decorators proposal](https://github.com/wycats/javascript-decorators) [start to gain popularity and creep into JS transpilers](https://twitter.com/sebmck/status/579300313514950657), it seems like a great time to implement some of the most useful ones provided by `lodash` and `underscore`. As currently no environment or transpiler fully supports generators yet, the code in this repo is hypothetical. [`Babel` is planning to release `decorators` soon](https://twitter.com/sebmck/status/579482622998409217) (updates to follow).

I've made the most useful set (for this case) of the wrapping functions `lodash` available as method decorators as shown below.

#### Example
```js
import {after, before, curry, curryRight, debounce, memoize, negate, once, throttle} from 'lodash-decorators';

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
```