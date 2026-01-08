import { config } from "dotenv";
config();

import {
  Client,
  GatewayIntentBits,
  Collection,
  Interaction
} from "discord.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// 👇 colección de comandos
const commands = new Collection<string, any>();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar comandos
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(`🤖 Bot conectado como ${client.user?.tag}`);
});

// Ejecutar comandos
client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  await command.execute(interaction);
});

client.login(process.env.TOKEN);
