/* eslint no-console: 0 */
const process = require('process');
const cp = require('child_process');
const path = require('path');


// shows how the runner will run a javascript action with env / stdout protocol
test.skip('test runs', () => {
  process.env.INPUT_MILLISECONDS = 500;
  const ip = path.join(__dirname, '..', 'index.js');
  console.log('ip', ip);
  console.log(cp.execSync(`node ${ip}`).toString());
});
