import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import animeQuotes, { IQuotes } from "../../lib/animeQuotes";
import AnimeQuotes from "animequotes";

@Command( "animequote" , {
      description: "Will give you random anime quote for the given character.",
      category: "weeb",
      usage: `animequote [character_name]`,
      cooldown: 5,
      exp: 10,
      dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, {context}: IArgs): Promise<void> => {
    const random = await AnimeQuotes.randomQuote();
    let randomText = "";
    randomText += `*✏ Quote: ${random.quote}*\n\n`;
    randomText += `*🎗 Said by: ${random.name}*\n\n`;
    randomText += `*📛 Source: ${random.anime}*`;
    if (!context) return void (await M.reply(`${randomText}`));
    const result = await animeQuotes(context.toLowerCase().trim());
    if ((result as { error: string }).error)
      return void (await M.reply(
        "Couldn't find any quote for the given character."
      ));
    const chara = result as IQuotes;
    let charaText = "";
    charaText += `*✏ Quote: ${chara.quote}*\n\n`;
    charaText += `*🎗 Said by: ${chara.name}*\n\n`;
    charaText += `*📛 Source: ${chara.anime}*`;
    await M.reply(charaText);
  };
}
