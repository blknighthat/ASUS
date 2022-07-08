import { GroupSettingChange } from "@adiwajshing/baileys";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "open", {
    description: "Opens the group for all participants.",
    category: "moderation",
    usage: `open`,
    adminOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
      return void M.reply("How can I open the group without being an admin?");
    if (M.groupMetadata.announce === "false")
      return void M.reply("Group is already open, Baka!");

    this.client.groupSettingChange(
      M.groupMetadata.id,
      GroupSettingChange.messageSend,
      false
    );
  };
}
