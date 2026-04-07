const express = require("express");
const path = require("path");
const fs = require("fs-extra");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

const app = express();
let sock;
async function startSock() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  sock = makeWASocket({ auth: state });
  sock.ev.on("creds.update", saveCreds);
}
startSock();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pair.html"));
});

app.get("/pair", async (req, res) => {
  try {
    const number = req.query.number;
    if (!number) return res.send("Enter phone number");
    const code = await sock.requestPairingCode(number);
    res.send(`Pairing Code: ${code}`);
  } catch (err) {
    res.send("Error generating code");
  }
});

app.get("/reset", async (req, res) => {
  try {
    await fs.remove("./session");
    res.send("Session cleared");
  } catch (err) {
    res.send("Error resetting session");
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Pair site running"));