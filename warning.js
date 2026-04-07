const db = require("../database");
module.exports = {
  name: "warnings",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned) return sock.sendMessage(jid, { text: "Tag user" });
    const user = mentioned[0];
    db.get("SELECT * FROM warnings WHERE user=? AND group_id=?", [user, jid], (err, row) => {
      const count = row ? row.count : 0;
      sock.sendMessage(jid, { text: `Warnings: ${count}` });
    });
  }
};