module.exports = {
  apps: [
    {
      name: 'nodejs-api',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env_production: { NODE_ENV: 'production', PORT: 3000 },
      env_staging: { NODE_ENV: 'staging', PORT: 3001 }
    }
  ]
};
