/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { IParsedArgs, ISimplifiedMessage } from "../../types";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

@Command( "wallpaper", {
    description: `Will send you random anime wallpaper of the given term.`,
    aliases: ["wpaper"],
    category: "weeb",
    usage: `wallpaper [term]`,
    cooldown: 5,
    exp: 20,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!joined)
      return void (await M.reply(`Give me a wallpaper term to search, Baka!`));
    const chitoge = joined.trim();
    const wall = new AnimeWallpaper();
    const pages = [1, 2, 3, 4];
    const random = pages[Math.floor(Math.random() * pages.length)];
    const wallpaper = await wall
      .getAnimeWall4({ title: chitoge, type: "sfw", page: random })
      .catch(() => null);
    if (!wallpaper)
      return void (await M.reply(
        `Couldn't find any matching term of wallpaper.`
      ));
    const i = Math.floor(Math.random() * wallpaper.length);
    const buffer = await request.buffer(wallpaper[i].image).catch((e) => {
      return void M.reply(e.message);
    });
    while (true) {
      try {
        M.reply(
          buffer || "✖ An error occurred. Please try again later.",
          MessageType.image,
          undefined,
          undefined,
          `*🌟 Here you go.*`,
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
