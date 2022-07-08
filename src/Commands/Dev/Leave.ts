import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "leave", {
    description: "Bot Leaves the group",
    category: "dev",
    usage: `leave`,
    modsOnly: true,
    cooldown: 5,
    exp: 10,
    dm: true
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    await M.reply(`*🚥Status:*\n\n✅Successfully Left ${M.groupMetadata?.subject}`);
    await this.client
      .groupLeave(M.from)
      .catch(() => M.reply("Failed to leave the Group"));
  };
}
