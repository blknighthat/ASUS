import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "switch", {
    description: "Switches the bot",
    category: "dev",
    usage: `switch <bot_name>`,
    modsOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const bot = await (await this.client.getGroupData(M.from)).bot;
    const i = joined.trim();
    if (!joined || i === "all") {
      await this.client.DB.group.updateOne(
        { jid: M.from },
        { $set: { bot: "all" } }
      );
      return void M.reply(`🟩 *Asuna🚀* is active now.`);
    }
    if (i === bot) {
      if (this.client.user.name === i)
        return void M.reply(`🟨 *I am already active*.`);
      else if (this.client.user.name !== i)
        return void M.reply(`🟨 *${i}* is already active.`);
    }
    await this.client.DB.group.updateOne({ jid: M.from }, { $set: { bot: i } });
    if (i === this.client.user.name)
      return void M.reply(`🟩 *I am now active*.`);
    else await M.reply(`🟩 *${i}* is now active.`);
  };
}
