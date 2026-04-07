module.exports = {
  name: "play",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    if (!args[0]) return sock.sendMessage(jid, { text: "Enter song name" });
    const query = args.join(" ");
    await sock.sendMessage(jid, { text: `Searching for: ${query} (feature placeholder)` });
  }
};