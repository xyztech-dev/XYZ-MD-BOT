module.exports = {
  name: "kick",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned) return sock.sendMessage(jid, { text: "Tag user to kick" });
    await sock.groupParticipantsUpdate(jid, mentioned, "remove");
    await sock.sendMessage(jid, { text: "User removed from group" });
  }
};