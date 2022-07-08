import { MessageType } from "@adiwajshing/baileys";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "reducegold", {
    description: "Reduces the amount of gold globally.",
    aliases: ["-gold"],
    category: "dev",
    usage: `reducegold`,
    modsOnly: true,
    cooldown: 5,
    exp: 10,
    dm: true
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!joined)
      return void (await M.reply(`Please provide the amount of gold to reduce.`));
    const term: any = joined.split(" ")[0];
    if (isNaN(term)) return void M.reply(`Well... It should be a number.`);
    await this.client.DB.user
      .find({})
      .sort([["Xp", "descending"]])
      .exec(async (err, res) => {
        if (err) return void M.reply(`...`);
        for (let i = 0; i < res.length; i++) {
          await this.client.reduceGold(res[i].jid, term);
        }
        return void M.reply(
          `🟩 *Removed ${term} gold from ${res.length} users wallet.*`
        );
      });
  };
}
