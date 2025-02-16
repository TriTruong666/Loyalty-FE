module.exports = {
  apps: [],
  deploy: {
    production: {
      user: "admin-picare",
      host: ["192.168.84.81"],
      ref: "origin/main",
      repo: "git@github.com:TriTruong666/Loyalty-FE.git",
      path: "/var/frontends/loyaltyfe",
      "pre-setup": "rm -r /var/frontends/loyaltyfe/*",
      "post-setup": "npm install",
      "pre-deploy": "pm2 start npm --name Loyalty-Frontend -- start && pm2 delete Loyalty-Frontend",
      "post-deploy": "npm i && npm run build && pm2 start npm --name Loyalty-Frontend -- start",
    },
  },
};
