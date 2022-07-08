import { GroupSettingChange } from "@adiwajshing/baileys";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "close", {
    description:
        "Close the group for all participants. Only Admins can message",
    category: "moderation",
    usage: `close`,
    adminOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
      return void M.reply("How can I close the group without being an admin?");
    if (M.groupMetadata.announce === "true")
      return void M.reply("Group is already closed, Baka!");
    this.client.groupSettingChange(
      M.groupMetadata.id,
      GroupSettingChange.messageSend,
      true
    );
    return;
  };
}
