/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from "axios";
import { MessageType, Mimetype } from "@adiwajshing/baileys";
import request from "../../lib/request";

@Command( "getgif", {
    description: "Will give you random gif of the given search term.",
    category: "utils",
    usage: `getgif [term]`,
    aliases: ["gif"],
    cooldown: 5,
    exp: 40,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!this.client.config.gifApi)
      return void M.reply("No key set for searching gifs. ");
    if (!joined) return void (await M.reply(`GIve me a search term, Baka!`));
    const search = joined.trim();
    const gif = await axios
      .get(
        `https://g.tenor.com/v1/search?q=${search}&key=${this.client.config.gifApi}&limit=100`
      )
      .catch(() => null);
    if (!gif)
      return void (await M.reply(`Couldn't find any matching gif term.`));
    const i = Math.floor(Math.random() * gif.data.results.length);
    const caption = "🌟 Here you go.";
    return void M.reply(
      await request.buffer(gif.data.results[i].media[0].mp4.url),
      MessageType.video,
      Mimetype.gif,
      [caption],
      caption
    );
  };
}
