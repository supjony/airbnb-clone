const sequelize = require("./models/index");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    process.exit(0);
  } catch (err) {
    console.error("Error connecting to DB:", err);
    process.exit(1);
  }
})();
