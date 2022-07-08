import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "deactivate", {
    aliases: ["deact"],
    description: "deactivate certain features on group-chats",
    category: "moderation",
    usage: `deactivate [feature]`,
    adminOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const type = joined.trim().toLowerCase() as toggleableGroupActions;
    if (!Object.values(toggleableGroupActions).includes(type))
      return void M.reply(
        `🟥 Invalid Option: *${this.client.util.capitalize(type)}*`
      );
    const data = await this.client.getGroupData(M.from);
    if (!data[type])
      return void M.reply(
        `🟨 *${this.client.util.capitalize(
          type
        )}* is already inactive`
      );
    if (type === "wild") {
      await this.client.DB.group.updateOne(
        { jid: M.from },
        { $set: { wild: false } }
      );
      await this.client.DB.feature.updateOne(
        { feature: "pokemon" },
        { $pull: { jids: M.from } }
      );
      return void M.reply(
        `🟩 *${this.client.util.capitalize(type)}* is now inactive`
      );
    }
    if (type === "chara") {
      await this.client.DB.group.updateOne(
        { jid: M.from },
        { $set: { chara: true } }
      );
      await this.client.DB.feature.updateOne(
        { feature: "chara" },
        { $pull: { jids: M.from } }
      );
      return void M.reply(`🟩 *Chara* is now inactive`);
    }
    if (type === "news") {
      await this.client.DB.group.updateOne(
        { jid: M.from },
        { $set: { news: false } }
      );
      await this.client.DB.feature.updateOne(
        { feature: "news" },
        { $pull: { jids: M.from } }
      );
      return void M.reply(
        `🟩 *${this.client.util.capitalize(type)}* is now inactive`
      );
    }
    await this.client.DB.group.updateOne(
      { jid: M.from },
      { $set: { [type]: false } }
    );
    return void M.reply(
      `🟩 *${this.client.util.capitalize(type)}* is now inactive`
    );
  };
}
