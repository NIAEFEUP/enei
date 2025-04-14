module.exports = {
  apps: /** @type {import('pm2').StartOptions[]} */ ([
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
    // {
    //   name: "enei-attendance",
    //   cron: "*/15 * * * *",
    //   script: "./ace.js",
    //   args: "db:seed -f database/seeders/99_check_in_based_on_time_attendance_recurring_seeder.js",
    // },
  ]),
};
