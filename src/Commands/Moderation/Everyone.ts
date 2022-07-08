/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { MessageType, Mimetype } from "@adiwajshing/baileys";
import { Sticker, Categories, StickerTypes } from "wa-sticker-formatter";

@Command( "everyone", {
    description: "Tags all users in group chat",
    aliases: ["all", "tagall", "members"],
    category: "moderation",
    usage: `everyone`,
    adminOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const stickers = [
      "https://www.linkpicture.com/q/images-8_31.jpeg",
      "https://www.linkpicture.com/q/images-12_74.jpeg",
    ];
    const random = stickers[Math.floor(Math.random() * stickers.length)];
    const term = joined.trim().split(" ");
    if (term[0] === "--s" || term[0] === "--sticker") {
      const sticker: any = await new Sticker(random, {
        pack: "READ QUOTED MESSAGE",
        author: "Asuna🚀",
        quality: 90,
        type: "default",
        categories: ["🎊"],
      });
      return void (await M.reply(
        await sticker.build(),
        MessageType.sticker,
        Mimetype.webp,
        M.groupMetadata?.participants.map((user) => user.jid)
      ));
    } else
      return void (await M.reply(
        `${
          M.groupMetadata?.subject || "*EVERYONE*"
        }\n*READ QUOTED MESSAGE*\n*[TAGGED MAGICALLY]*`,
        undefined,
        undefined,
        M.groupMetadata?.participants.map((user) => user.jid)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ).catch((reason: any) =>
        M.reply(`✖️ An error occurred, Reason: ${reason}`)
      ));
  };
}
