module.exports = {
  apps: [
    // Backend - User
    {
      name: "backend-user",
      script: "index.js",
      cwd: "/opt/user/app/server",
      interpreter: "node",
      out_file: "/opt/user/log/backend-user-out.log",
      error_file: "/opt/user/log/backend-user-error.log",
      merge_logs: true,
    },
    // Frontend - User (FIXED)
    {
      name: "frontend-user",
      script: "npx",
      args: "serve -s build -l 4000",
      cwd: "/opt/user/app/client",
      interpreter: "none",
      out_file: "/opt/user/log/frontend-user-out.log",
      error_file: "/opt/user/log/frontend-user-error.log",
      merge_logs: true,
    }
  ]
};

