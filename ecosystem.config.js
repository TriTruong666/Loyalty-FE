module.exports = {
  apps: [],
  deploy: {
    production: {
      user: "admin-picare",

      host: ["192.168.84.81"],

      ref: "origin/main",

      repo: "git@github.com:TriTruong666/Loyalty-FE.git",

      path: "/var/frontends/loyaltyfe",

      "post-setup": "npm install && npm run build && npm run start",

      "post-deploy": "pm2 startOrRestart ecosystem.config.js --env production",
    },
  },
};
