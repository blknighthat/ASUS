/** @format */

import nHentai from "shentai";
import { evaluate } from "mathjs";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

@Command( "nsfwdoujin", {
    description: `Gives you the doujin of the given idea and page.`,
    aliases: ["ndoujin"],
    category: "nsfw",
    usage: `ndoujin [id|page]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    /*eslint-disable @typescript-eslint/no-unused-vars*/
    const sHentai = new nHentai();
    const terms: any = joined.trim().split("|");
    if (terms[0] === "")
      return void M.reply(
        `Give me the id and page of the nhentai doujin, Baka!`
      );
    const id: string = terms[0];
    const page: number = terms[1];
    if (!page) return void M.reply("Give me the page, Baka!");
    const o = evaluate(page - 1);
    if (!(await this.client.getGroupData(M.from)).nsfw)
      return void M.reply(
        `Don't be a pervert, Baka! This is not an NSFW group.`
      );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doujin = await sHentai.getDoujin(id).catch((err: any) => {
      return void M.reply(`Invalid doujin id, Baka!.`);
    });
    if (page > doujin.pages.length)
      return void M.reply(
        `I think you should check the total pages of the doujin.`
      );
    if (page == undefined) {
      return void M.reply(
        `*https://en.wikipedia.org/wiki/Number*\nI think this might help you.`
      );
    }

    let text = "";
    text += `🎀 *Title: ${doujin.titles.english}*\n`;
    text += `🎗 *Tags: ${doujin.tags.join(", ")}*\n`;
    text += `✍ *Author: ${doujin.author}*\n`;
    text += `📒 *Reading Progress: ${page} out of ${doujin.pages.length}*`;
    const buffer = await request.buffer(doujin.pages[o]).catch((e) => {
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
          M.reply(
            `✖ An error occurred. Please try again later. Here's the page URL: *${doujin.pages[o]}*`
          );
        });
        break;
      } catch (e) {
        // console.log('Failed2')
        M.reply(
          `✖ An error occurred. Please try again later. Here's the page URL: *${doujin.pages[o]}*`
        );
        console.log(
          `This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
        );
      }
    }
    return void null;
  };
}
