const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CI/CD Docker Pipeline App</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #0f172a;
          color: #f8fafc;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background: #1e293b;
          padding: 40px;
          border-radius: 14px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          border: 1px solid #334155;
          max-width: 520px;
          width: 90%;
        }
        .badge {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.4);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: bold;
          display: inline-block;
          margin-bottom: 18px;
        }
        h1 {
          color: #38bdf8;
          margin: 0 0 12px 0;
          font-size: 28px;
        }
        p {
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .info-box {
          background: #0f172a;
          padding: 16px;
          border-radius: 8px;
          text-align: left;
          font-family: monospace;
          font-size: 14px;
          color: #94a3b8;
          border: 1px solid #334155;
        }
        .info-box span {
          color: #f8fafc;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">DEPLOYED VIA GITHUB ACTIONS & DOCKER</div>
        <h1>CI/CD Pipeline App</h1>
        <p>
          This application was automatically tested, built into a Docker image,
          pushed to Docker Hub, and deployed locally with zero cloud servers needed!
        </p>
        <div class="info-box">
          <div>App Name: <span>cicd-docker-project</span></div>
          <div>Version: <span>1.0.0</span></div>
          <div>Container ID / Host: <span>${os.hostname()}</span></div>
          <div>Status: <span style="color: #34d399;">Healthy & Running</span></div>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    app: 'cicd-docker-project',
    version: '1.0.0'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
  });
}

module.exports = app;
