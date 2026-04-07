const db = require("../database");
module.exports = {
  name: "antilink",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    db.get("SELECT * FROM settings WHERE group_id=?", [jid], (err, row) => {
      if (row) {
        const newState = row.antilink === 1 ? 0 : 1;
        db.run("UPDATE settings SET antilink=? WHERE id=?", [newState, row.id]);
        sock.sendMessage(jid, { text: newState ? "Antilink enabled" : "Antilink disabled" });
      } else {
        db.run("INSERT INTO settings (group_id, antilink) VALUES (?, 1)", [jid]);
        sock.sendMessage(jid, { text: "Antilink enabled" });
      }
    });
  }
};