/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import pTable from "ptable";
import npt from "node-periodic-table";

@Command( "element", {
    aliases: ["e"],
    description: "Gives you the info of the given element. ",
    category: "educative",
    usage: `element [name/number/symbol]`,
    cooldown: 5,
    exp: 30,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!joined)
      return void M.reply("Give me an element name/number/symbol, Baka!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chitoge: any = joined.trim();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const search = await pTable(chitoge);
    console.log(search);
    if (search === undefined) {
      return void (await M.reply(
        `*https://en.m.wikipedia.org/wiki/Periodic_table*\n\nI think this might help you.\n`
      ));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await npt.getByNumber(search.number);
    let text = "";
    text += `🔴 *Elelment: ${response.name}*\n`;
    text += `⬜ *Atomic Number: ${response.number}*\n`;
    text += `🟡 *Atomic Mass: ${response.atomic_mass}*\n`;
    text += `⬛ *Symbol: ${response.symbol}*\n`;
    text += `❓ *Appearance: ${response.apearance}*\n`;
    text += `🟢 *Phase: ${response.phase}*\n`;
    text += `♨️ *Boiling Point: ${response.boil} K*\n️`;
    text += `💧 *Melting Point: ${response.melt} K*\n`;
    text += `🟣 *Density: ${response.density} g/mL*\n`;
    text += `⚫ *Shells: ${response.shells.join(", ")}*\n`;
    text += `🌐 *URL: ${response.source}*\n\n`;
    text += `💬 *Summary: ${response.summary}*`;
    await M.reply(text);
  };
}
