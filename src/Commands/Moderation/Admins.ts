import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "admins", {
    description: "Tags all Admins 🎖️",
    category: "moderation",
    usage: `admins (Message)`,
    adminOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    return void (await M.reply(
      `ADMINS!\n[Tags Hidden]`,
      undefined,
      undefined,
      M.groupMetadata?.admins
    ).catch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (reason: any) => M.reply(`an error occurred, Reason: ${reason}`)
    ));
  };
}
