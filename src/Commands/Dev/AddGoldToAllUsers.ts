import { MessageType } from "@adiwajshing/baileys";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types';

@Command( "addgold", { 
    description: "",
    aliases: ["bcg"],
    category: "dev",
    usage: ``,
    modsOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!joined)
      return void (await M.reply(`Please provide the amount of gold to give.`));
    const term: any = joined.split(" ")[0];
    if (isNaN(term)) return void M.reply(`Well... It should be a number.`);
    await this.client.DB.user
      .find({})
      .sort([["Xp", "descending"]])
      .exec(async (err, res) => {
        if (err) return void M.reply(`...`);
        for (let i = 0; i < res.length; i++) {
          await this.client.addGold(res[i].jid, term);
        }
        return void M.reply(
          `🟩 *Added ${term} gold to ${res.length} users wallet.*`
        );
      });
  };
}
