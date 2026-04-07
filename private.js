module.exports = {
  name: "private",
  async execute(sock, msg) {
    global.MODE = "private";
    await sock.sendMessage(msg.key.remoteJid, { text: "Bot switched to private mode" });
  }
};