module.exports = {
    HOST: "viaduct.proxy.rlwy.net",
    USER: "root",
    PASSWORD: "hUYzcKdiJwcNyWfFFHbNzuCJdBbiFsPC",
    DB: "railway",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };