module.exports = {
  name: "demote",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned) return sock.sendMessage(jid, { text: "Tag user to demote" });
    await sock.groupParticipantsUpdate(jid, mentioned, "demote");
    await sock.sendMessage(jid, { text: "User removed as admin" });
  }
};