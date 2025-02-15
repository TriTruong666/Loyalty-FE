module.exports = {
  apps: [],
  deploy: {
    production: {
      user: "admin-picare",

      host: ["192.168.84.81"],

      ref: "origin/main",

      repo: "git@github.com:TriTruong666/Loyalty-FE.git",

      path: "/var/frontends/loyaltyfe",

      "post-setup": "npm install && npm run build",

      "post-deploy": "npm run start && pm2 reload loyalty-demo",
    },
  },
};
