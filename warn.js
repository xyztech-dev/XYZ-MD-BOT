const db = require("../database");
module.exports = {
  name: "warn",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned) return sock.sendMessage(jid, { text: "Tag user to warn" });
    const user = mentioned[0];
    db.get("SELECT * FROM warnings WHERE user=? AND group_id=?", [user, jid], (err, row) => {
      if (row) {
        const newCount = row.count + 1;
        db.run("UPDATE warnings SET count=? WHERE id=?", [newCount, row.id]);
        sock.sendMessage(jid, { text: `User warned. Total warnings: ${newCount}` });
        if (newCount >= 3) sock.groupParticipantsUpdate(jid, [user], "remove");
      } else {
        db.run("INSERT INTO warnings (user, group_id, count) VALUES (?, ?, 1)", [user, jid]);
        sock.sendMessage(jid, { text: "User warned. Total warnings: 1" });
      }
    });
  }
};