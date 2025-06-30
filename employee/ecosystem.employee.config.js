module.exports = {
  apps: [
    // Backend - Employee......
    {
      name: "backend-employee",
      script: "index.js",
      cwd: "/opt/employee/app/server",
      interpreter: "node",
      out_file: "/opt/employee/logs/backend-employee-out.log",
      error_file: "/opt/employee/logs/backend-employee-error.log",
      merge_logs: true,
    },

    // Frontend - Employee
    {
      name: "frontend-employee",
      script: "npx",
      args: "serve -s build -l 3000",
      cwd: "/opt/employee/app/client",
      interpreter: "none",
      out_file: "/opt/employee/logs/frontend-employee-out.log",
      error_file: "/opt/employee/logs/frontend-employee-error.log",
      merge_logs: true,
    }
  ]
};

