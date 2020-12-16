# AppContext
Async/Sync Application Context

A global sync and async store. Used for non-framework runtime dependencies, such as service injections.

Example

```javascript
import {AppContext} from '@eavichay/appcontext';

const SomeService = {
  doSomething() {
    console.log('it works');
  }
};

class SomeModule {
  constructor() {
    this.init();
  }
  
  async init() {
    const service = await AppContext.require('someService');
    service.doSomething();
  }
}

const module = new SomeModule(); // module now waits for the service to be provided

AppContext.provide('someService', SomeService);

// it works
```
