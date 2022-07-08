/** @format */

import translate from "translate-google";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "translate", {
    aliases: ["tr"],
    description: "Will translate the given word to your selected language. ",
    category: "utils",
    usage: `tr <word>|<language_code>\n\nExample: tr zh-cn|Hello`,
    cooldown: 5,
    exp: 40,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const texts = joined.trim().split("|");
    if (texts[0] === "")
      return void M.reply(
        `Use tr (word_that_you_wanna_translate|language_code)`
      );
    const word = texts[0];
    const code = texts[1];
    if (!code) return void M.reply("Give me the language code, Baka!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await translate(word, { to: code }).catch((err: any) => {
      return void M.reply(`Invalid language code, Baka!`);
    });
    const text = `${response}`;
    M.reply(text);
  };
}
