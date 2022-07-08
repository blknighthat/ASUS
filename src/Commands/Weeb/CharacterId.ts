/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from "axios";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

@Command( "characterid", {
    description: `Gives you the data of the given character id.`,
    aliases: ["charaid"],
    category: "weeb",
    usage: `charaid [id]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    /*eslint-disable @typescript-eslint/no-unused-vars*/
    if (!joined) return void (await M.reply(`Give me a character id, Baka!`));
    const chitoge: any = joined.trim();
    const chara = await axios
      .get(`https://api.jikan.moe/v3/character/${chitoge}`)
      .catch((err: any) => {
        return void M.reply(`Couldn't find any character id.`);
      });

    let text = "";
    text += `💙 *Name: ${chara?.data.name}*\n`;
    text += `🤍 *Kanji name: ${chara?.data.name_kanji}*\n`;
    text += `💚 *Nicknames: ${chara?.data.nicknames.join(", ")}*\n`;
    text += `💛 *Source: ${chara?.data.animeography[0].name}*\n\n`;
    text += `🌐 *URL: ${chara?.data.url}*\n\n`;
    text += `❤ *Description:* ${chara?.data.about}`;
    const buffer = await request.buffer(chara?.data.image_url);
    await M.reply(
      buffer,
      MessageType.image,
      undefined,
      undefined,
      text,
      undefined
    );
  };
}
