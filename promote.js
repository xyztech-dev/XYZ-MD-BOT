module.exports = {
  name: "promote",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned) return sock.sendMessage(jid, { text: "Tag user to promote" });
    await sock.groupParticipantsUpdate(jid, mentioned, "promote");
    await sock.sendMessage(jid, { text: "User promoted to admin" });
  }
};