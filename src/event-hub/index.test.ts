import EventHub from './index';

type TestCase = (message: string) => void

const test1: TestCase = (message) => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object === true, 'is a object');
  console.log(message)
};

const test2: TestCase = (message) => {
  const eventHub = new EventHub();
  let called = false;
  eventHub.on('xxx', (data) => {
    console.log('called', data);
    called = true;
    console.assert(data === '123');
  });
  eventHub.emit('xxx', '123');
  setTimeout(() => {
    console.assert(called === true);
  }, 1000);
  console.log(message)
};

const test3: TestCase = (message) => {
  const eventHub = new EventHub();
  let called = false;
  const fn1 = () => {
    called = true;
    console.log(called);
  };
  eventHub.on('yyy', fn1);
  eventHub.undescribe('yyy', fn1);
  eventHub.emit('yyy');
  setTimeout(() => {
    console.log(called);
  }, 2000);
  console.log(message)
};

// test1('test1');
// test2('test2');
// test3('test3');