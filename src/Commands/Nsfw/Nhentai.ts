/** @format */

import nHentai from "shentai";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { MessageType } from "@adiwajshing/baileys";
import request from "../../lib/request";

@Command( "nhentai", {
    description: `Searches the given nhentai doujin.`,
    aliases: ["nhentai"],
    category: "nsfw",
    usage: `nhentai [term]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    /*eslint-disable @typescript-eslint/no-unused-vars*/
    if (!(await this.client.getGroupData(M.from)).nsfw)
      return void M.reply(
        `Don't be a pervert, Baka! This is not an NSFW group.`
      );
    if (!joined)
      return void (await M.reply(
        `Give me an nhentai doujin title to search, Baka!`
      ));
    const sHentai = new nHentai();
    const title = joined.trim();
    let text = "";
    const doujin = await sHentai.search(title).catch((err: any) => {
      return void M.reply(`Couldn't find any matching doujin.`);
    });
    for (let i = 0; i < 10; i++) {
      text += `🎀 *Title: ${doujin.results[i].titles.english}*\n`;
      text += `Use ${this.client.config.prefix}ndoujin ${doujin.results[i].id} | 1 to read this doujin.\n\n`;
    }
    const buffer = await request.buffer(doujin.results[0].cover).catch((e) => {
      return void M.reply(e.message);
    });
    while (true) {
      try {
        M.reply(
          buffer || "✖ An error occurred. Please try again later.",
          MessageType.image,
          undefined,
          undefined,
          `${text}`,
          undefined
        ).catch((e) => {
          console.log(
            `This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`
          );
          // console.log('Failed')
          M.reply(`✖ An error occurred. Please try again later.`);
        });
        break;
      } catch (e) {
        // console.log('Failed2')
        M.reply(`✖ An error occurred. Please try again later.`);
        console.log(
          `This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
        );
      }
    }
    return void null;
  };
}
