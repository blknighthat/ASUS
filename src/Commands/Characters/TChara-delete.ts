import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "tchara-delete", {
    description: "Deletes the ongoing character trade of the group.",
    category: "characters",
    usage: `tchara-delete`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const data = await await (
      await this.client.getGroupData(M.from)
    ).charaTrade;
    if (!data.ongoing)
      return void M.reply(`🟥 *There aren't any trade ongoing*`);
    if (data.startedBy !== M.sender.jid)
      return void M.reply(`🟥 *You can't delete this trade*`);
    await this.client.DB.group.updateMany(
      { jid: M.from },
      {
        $unset: {
          "charaTrade.startedBy": "",
          "charaTrade.for.id": "",
          "charaTrade.for.name": "",
          "charaTrade.for.source": "",
          "charaTrade.offer.id": "",
          "charaTrade.offer.name": "",
          "charaTrade.offer.image": "",
          "charaTrade.offer.about": "",
          "charaTrade.offer.source": "",
        },
      }
    );
    await this.client.DB.group.updateOne(
      { jid: M.from },
      { $set: { "charaTrade.ongoing": false } }
    );
    return void M.reply(`Character trade deleted.`);
  };
}
