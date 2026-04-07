const config = require("../config");
module.exports = {
  name: "menu",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const menu = `╔════════════════════════════════╗
║   👹  ${config.BOT_NAME}  👹   ║
╚════════════════════════════════╝

OWNER COMMANDS
.currentfont
.setprefix
.private
.public

ADMIN COMMANDS
.kick
.promote
.demote
.tagall
.groupinfo

MODERATION
.warn
.warnings
.antilink
.lock
.unlock

MEDIA
.play
.tiktok
.youtube
.sticker
.vv
.editpfp

FUN
.joke
.dice
.truth
.dare
.quote

UTILITY
.calc
.password
.qrcode
.uptime
.weather

Type command with prefix ${config.PREFIX}
`;
    await sock.sendMessage(jid, { text: menu });
  }
};