module.exports = {
  apps: [],
  deploy: {
    production: {
      user: "admin-picare",
      host: ["192.168.84.81"],
      ref: "origin/main",
      repo: "git@github.com:TriTruong666/Loyalty-FE.git",
      path: "/var/frontends/loyaltyfe",
      "post-setup": "pnpm install --verbose && pnpm run build",
      "pre-deploy": "pm2 start npm --name Loyalty-Frontend -- start && pm2 delete Loyalty-Frontend",
      "post-deploy": "pnpm i --verbose && pnpm run build && pm2 start pnpm --name Loyalty-Frontend -- start",
    },
  },
};
