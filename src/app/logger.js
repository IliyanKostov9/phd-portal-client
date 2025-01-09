const { format, transports } = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new Log({
      action: "Action",
      user: {
        oid: "1212",
        name: "name",
        email: "email",
        role: "role"
      }
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  );
}

module.exports = logger;
