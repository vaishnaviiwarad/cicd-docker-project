const http = require('http');
const assert = require('assert');
const app = require('./app');

console.log('Running automated application tests...');

// Start app on a temporary port for testing
const server = app.listen(0, () => {
  const port = server.address().port;

  // Test 1: Home page returns 200 OK
  http.get(`http://localhost:${port}/`, (res) => {
    assert.strictEqual(res.statusCode, 200, 'Expected HTTP 200 for /');
    console.log('[PASS] Test 1: GET / returned HTTP 200');

    // Test 2: Health check endpoint returns UP
    http.get(`http://localhost:${port}/health`, (res2) => {
      let data = '';
      res2.on('data', (chunk) => {
        data += chunk;
      });
      res2.on('end', () => {
        assert.strictEqual(res2.statusCode, 200, 'Expected HTTP 200 for /health');
        const json = JSON.parse(data);
        assert.strictEqual(json.status, 'UP', 'Expected status UP');
        console.log('[PASS] Test 2: GET /health returned { status: "UP" }');

        server.close(() => {
          console.log('All tests passed successfully!');
          process.exit(0);
        });
      });
    });
  }).on('error', (err) => {
    console.error('[FAIL] Test error:', err);
    server.close(() => process.exit(1));
  });
});
