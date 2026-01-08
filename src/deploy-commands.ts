import { REST, Routes } from "discord.js";
import { data as decodeCommand } from "./commands/decode.js";

const commands = [
  decodeCommand.toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

async function deploy() {
  try {
    console.log("⏳ Registrando comandos slash...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands }
    );

    console.log("✅ Comandos registrados correctamente");
  } catch (error) {
    console.error("❌ Error registrando comandos:", error);
  }
}

console.log("TOKEN:", process.env.TOKEN ? "OK" : "MISSING");
console.log("CLIENT_ID:", process.env.CLIENT_ID);

deploy();
