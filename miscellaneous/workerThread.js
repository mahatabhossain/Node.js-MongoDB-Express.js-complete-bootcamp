const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__dirname + '/' + 'testWorker.js');
  worker.on('message', msg => {
    console.log(msg);
  });
} else {
  parentPort.postMessage('Hello Workers');
}
