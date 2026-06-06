module.exports = {
  apps: [
    {
      name: 'nodejs-api-staging',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: { NODE_ENV: 'staging', PORT: 3001 }
    }
  ]
};
