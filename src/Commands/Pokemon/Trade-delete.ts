import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "trade-delete", {
    aliases: ["t-delete"],
    description: "Deletes the ongoing pokemon trade of the group.",
    category: "pokemon",
    usage: `trade-delete`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const data = await await this.client.getGroupData(M.from);
    if (!data.trade) return void M.reply(`🟥 *There aren't any trade ongoing*`);
    if (data.startedBy !== M.sender.jid)
      return void M.reply(`🟥 *You can't delete this trade*`);
    await this.client.DB.group.updateMany(
      { jid: M.from },
      { $unset: { tOffer: "", tWant: "", startedBy: "" } }
    );
    await this.client.DB.group.updateOne(
      { jid: M.from },
      { $set: { trade: false } }
    );
    return void M.reply(`Pokemon trade deleted.`);
  };
}
