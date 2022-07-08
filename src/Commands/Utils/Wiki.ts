/** @format */

import wikiScraper, { IWiki } from "../../lib/wikiScraper";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "wikipedia", {
    aliases: ["wiki"],
    description: "Will fetch the result of the given query from wikipedia. ",
    category: "utils",
    usage: `wiki [query]`,
    cooldown: 5,
    exp: 20,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!joined) return void M.reply("Provide a query, Baka!");
    const result = await wikiScraper(joined.toLowerCase().trim());
    if ((result as { error: string }).error)
      return void (await M.reply("Invalid wikipedia page, Baka!"));
    const wiki = result as IWiki;
    let text = "";
    text += `*🎀 Title: ${wiki.title}*\n\n`;
    text += `*📜 Description: ${wiki.description}*\n\n`;
    text += `*🌐 URL: ${wiki.content_urls.desktop.page}*\n\n`;
    text += `*❄ Summary:* ${wiki.extract}`;
    await M.reply(text);
  };
}
