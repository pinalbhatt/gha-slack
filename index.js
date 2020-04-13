/* eslint no-console: 0 */
const core = require('@actions/core');
const { postMsg } = require('./lib/slack');

async function run() {
  try {
    const webHookUrl = core.getInput('WebHook');
    const category = core.getInput('Category');
    const message = core.getInput('Message');
    await postMsg(webHookUrl, category, message);
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
