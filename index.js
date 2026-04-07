const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const db = require("./database");
const config = require("./config");
const fs = require("fs");
const path = require("path");

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
const commands = {};
for (const file of commandFiles) {
  const cmd = require(`./commands/${file}`);
  commands[cmd.name] = cmd;
}

async function startSock() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const sock = makeWASocket({ auth: state });
  sock.ev.on("creds.update", saveCreds);

  sock.ev.on('messages.upsert', async m => {
    const msg = m.messages[0];
    if (!msg.message || !msg.key.fromMe) {
      const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
      if (text && text.startsWith(config.PREFIX)) {
        const args = text.slice(config.PREFIX.length).trim().split(/ +/);
        const cmdName = args.shift().toLowerCase();
        const sender = msg.key.participant || msg.key.remoteJid;
        if (global.MODE === 'private' && !config.SUDO_NUMBERS.includes(sender.split('@')[0])) return;
        if (commands[cmdName]) await commands[cmdName].execute(sock, msg, args);
      }
    }
  });
}
startSock();