const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bot.db", (err) => {
  if (err) console.log("Database error", err);
  else console.log("Database connected");
});
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS warnings (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, group_id TEXT, count INTEGER DEFAULT 0)`);
  db.run(`CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id TEXT, antilink INTEGER DEFAULT 0)`);
});
module.exports = db;