/** @format */

import { evaluate } from "mathjs";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "calculator", {
    aliases: ["calc"],
    description: "Calculates the given value. ",
    category: "educative",
    usage: `calc [value]`,
    cooldown: 5,
    exp: 20,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!joined) return void M.reply("Provide the value to calculate, Baka!");
    const value = context.trim();
    const calc = evaluate(value);
    const text = `💡 *Solution for ${value} = ${calc}*`;
    await M.reply(text)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((reason: any) => M.reply(`${reason}`));
  };
}
