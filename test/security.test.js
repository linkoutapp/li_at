const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

test('the popup requests only the LinkedIn session cookie and never logs it', () => {
  const fields = {cookieText: {value: ''}, status: {textContent: ''}};
  const calls = [];
  vm.runInNewContext(fs.readFileSync(path.join(root, 'popup.js'), 'utf8'), {
    document: {getElementById: id => fields[id]},
    chrome: {runtime: {}, cookies: {get(filter, callback) {
      calls.push(JSON.parse(JSON.stringify(filter)));
      callback({value: 'SYNTHETIC_SESSION'});
    }}},
    console: {log() {throw new Error('Cookie logging is forbidden');}},
  });
  assert.deepEqual(calls, [{url: 'https://www.linkedin.com/', name: 'li_at'}]);
  assert.equal(fields.cookieText.value, 'SYNTHETIC_SESSION');
});

test('cookie access failure clears the field without exposing error details', () => {
  const fields = {cookieText: {value: 'old'}, status: {textContent: ''}};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'popup.js'), 'utf8'), {
    document: {getElementById: id => fields[id]},
    chrome: {runtime: {lastError: {message: 'SENSITIVE_DIAGNOSTIC'}}, cookies: {
      get(filter, callback) { callback(undefined); },
    }},
  });
  assert.equal(fields.cookieText.value, '');
  assert.doesNotMatch(fields.status.textContent, /SENSITIVE_DIAGNOSTIC/);
});

test('manifest grants no all-site, tab, or background access', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json')));
  assert.equal(manifest.manifest_version, 3);
  assert.deepEqual(manifest.permissions, ['cookies']);
  assert.deepEqual(manifest.host_permissions, ['https://www.linkedin.com/*']);
  assert.equal(manifest.background, undefined);
  assert.equal(manifest.action.default_popup, 'index.html');
  assert.equal(fs.existsSync(path.join(root, 'background.js')), false);
});
