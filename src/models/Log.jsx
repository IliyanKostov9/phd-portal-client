import LogsAPI from "@/lib/api/logs";

const Transport = require("winston-transport");

class Log extends Transport {
  constructor(opts) {
    super(opts);

    this.action = opts.action;
    this.user = opts.user;
  }

  async log(info, callback) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    const log = {
      description: info.message,
      timestamp: new Date().toISOString(),
      action: this.action,
      level: info.level,
      user: this.user
    };

    const { saveLog } = LogsAPI();
    await saveLog(log);

    callback(null, true);
  }
}

module.exports = Log;
