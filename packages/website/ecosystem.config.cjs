module.exports = {
  apps: [
    {
      name: "enei-website",
      script: "./bin/server.js",
      instances: "1",
      exec_mode: "cluster",
      autorestart: true,
    },
    {
      name: "enei-jobs",
      script: "./ace.js",
      args: "jobs:listen",
      autorestart: true,
    },
  ],
};
