/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { MessageType, MimeType } from "@adiwajshing/baileys";
import { Sticker, Categories, StickerTypes } from "wa-sticker-formatter";

@Command( "ping", {
    description: "Tags all users in group chat",
    aliases: ["all", "tagall", "ping"],
    category: "dev",
    usage: `ping`,
    modsOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    flags.forEach((flag) => (joined = joined.replace(flag, "")));
    const members = await (
      await this.client.groupMetadata(M.from)
    ).participants;
    const stickers = [
      "https://www.linkpicture.com/q/images-8_31.jpeg",
      "https://www.linkpicture.com/q/images-12_74.jpeg",
    ];
    const random = stickers[Math.floor(Math.random() * stickers.length)];
    if (flags.includes("--s") || flags.includes("--sticker")) {
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
    } else if (flags.includes("--h") || flags.includes("--hide")) {
      return void (await M.reply(
        `*📮 Group: ${M.groupMetadata?.subject}*\n👥 *Members: ${
          members.length
        }*\n📢 *Announcer: @${M.sender.jid.split("@")[0]}*\n🧧 *Tags: HIDDEN*`,
        undefined,
        undefined,
        M.groupMetadata?.participants.map((user) => user.jid)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ).catch((reason: any) =>
        M.reply(`✖️ An error occurred, Reason: ${reason}`)
      ));
    } else {
      interface metadata {
        mods: string[];
        admins: string[];
        others: string[];
      }
      const metadata: metadata = {
        mods: [],
        admins: [],
        others: [],
      };
      for (const i of members) {
        if (i.jid === M.sender.jid) continue;
        if (!this.client.config.mods?.includes(i.jid)) continue;
        metadata.mods.push(i.jid);
      }
      for (const a of members) {
        if (a.jid === M.sender.jid) continue;
        if (this.client.config.mods?.includes(a.jid)) continue;
        if (!a.isAdmin) continue;
        metadata.admins.push(a.jid);
      }
      for (const k of members) {
        if (k.jid === M.sender.jid) continue;
        if (this.client.config.mods?.includes(k.jid)) continue;
        if (k.isAdmin) continue;
        metadata.others.push(k.jid);
      }
      let text = `*📮 Group: ${M.groupMetadata?.subject}*\n👥 *Members: ${
        members.length
      }*\n📢 *Announcer: @${M.sender.jid.split("@")[0]}*\n🧧 *Tags:*`;
      if (metadata.mods.length > 0) {
        for (const Mods of metadata.mods) {
          text += `\n🏅 *@${Mods.split("@")[0]}*`;
        }
      }
     // text += `\n`;
      if (metadata.admins.length > 0) {
        text += `\n`;
        for (const admins of metadata.admins) {
          text += `\n🎖 *@${admins.split("@")[0]}*`;
        }
      }
     // text += `\n`;
      if (metadata.others.length > 0) {
        text += `\n`;
        for (const others of metadata.others) {
          text += `\n🎗 *@${others.split("@")[0]}*`;
        }
      }
      return void M.reply(
        text,
        MessageType.text,
        undefined,
        M.groupMetadata?.participants.map((user) => user.jid)
      );
    }
  };
}
