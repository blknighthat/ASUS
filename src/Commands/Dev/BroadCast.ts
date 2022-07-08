/** @format */

import { MessageType } from "@adiwajshing/baileys";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "broadcast", {
    description:
        "Will make a broadcast for groups where the bot is in. Can be used to make announcements.",
    aliases: ["bcast", "announcement", "bc"],
    category: "dev",
    usage: `bc`,
    modsOnly: true,
    cooldown: 5,
    exp: 10,
    dm: true
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!joined)
      return void (await M.reply(`Please provide the Broadcast Message.`));
    const term = joined.trim();
    const images = [
      "https://www.linkpicture.com/q/Asunabotto.jpg",
    ];
    const selected = images[Math.floor(Math.random() * images.length)];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chats: any = this.client.chats
      .all()
      .filter((v) => !v.read_only && !v.archive)
      .map((v) => v.jid)
      .map((jids) => (jids.includes("g.us") ? jids : null))
      .filter((v) => v);
    for (let i = 0; i < chats.length; i++) {
      const text = `*「𝖠𝗌𝗎𝗇𝖺🚀𝖡𝗋𝗈𝖺𝖽𝖼𝖺𝗌𝗍」*\n\n${term}\n\n*🪶Author: ${M.sender.username}*`;
      this.client.sendMessage(chats[i], { url: selected }, MessageType.image, {
        caption: `${text}`,
        contextInfo: {	mentionedJid: M.groupMetadata?.participants.map((user) => user.jid),
				},
      });
    }
    await M.reply(`✅ Broadcast Message sent to *${chats.length} groups*.`);
  };
}
