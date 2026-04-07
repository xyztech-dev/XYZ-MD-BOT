module.exports = {
  name: "sticker",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted) return sock.sendMessage(jid, { text: "Reply to an image or video to create sticker" });

    await sock.sendMessage(jid, { text: "Sticker created (feature placeholder)" });
  }
};