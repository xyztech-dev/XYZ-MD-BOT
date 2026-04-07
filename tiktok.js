module.exports = {
  name: "tiktok",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    if (!args[0]) return sock.sendMessage(jid, { text: "Send TikTok link" });
    const link = args[0];
    await sock.sendMessage(jid, { text: `Downloading TikTok video: ${link} (feature placeholder)` });
  }
};