import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Attachment
} from "discord.js";

import { DungeonDecoder } from "../decoder-core/services/decoder.js";

export const data = new SlashCommandBuilder()
  .setName("decode")
  .setDescription("Decodifica un archivo .txt con el hex del dungeon")
  .addAttachmentOption(option =>
    option
      .setName("archivo")
      .setDescription("Archivo .txt con el código hexadecimal")
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const file = interaction.options.getAttachment("archivo", true);

  // Validación básica
  if (!file.name.endsWith(".txt")) {
    await interaction.reply({
      content: "❌ El archivo debe ser .txt",
      ephemeral: true
    });
    return;
  }

  try {
    // Descargar el archivo
    const response = await fetch(file.url);
    const text = await response.text();

    const hex = text.trim();

    const bosses = DungeonDecoder.decode(hex);

    if (!bosses.length) {
      await interaction.reply("❌ No se detectaron jefes.");
      return;
    }

    const result = bosses
      .map((b, i) => `**${i + 1}. ${b.name}** — ${b.color}`)
      .join("\n");

    await interaction.reply({
      content: `🧩 **Orden de jefes:**\n\n${result}`
    });

  } catch (error) {
    await interaction.reply({
      content: "❌ Error leyendo o decodificando el archivo.",
      ephemeral: true
    });
  }
}
