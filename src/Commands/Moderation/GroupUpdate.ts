import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "groupchange", {
    description: "Updates the Group Subject or Description.",
    category: "moderation",
    aliases: ["gadd", "gset"],
    usage: `gset (sub/desc) (value)`,
    adminOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
      return void M.reply("Can not update without being an admin");
    // check if first parameter is subject or description
    if (M.args.length < 2)
      return void M.reply("You need to specify a subject and a value");
    const subject = M.args[1].toLowerCase();
    const value = M.args.slice(2).join(" ");
    if (subject === "sub" || subject === "subject") {
      await this.client
        .groupUpdateSubject(M.groupMetadata.id, value.toString())
        .then(() => {
          return void M.reply("Group subject updated");
        })
        .catch((e) => {
          console.error(e);
          return void M.reply("Error updating subject");
        });
    } else if (subject === "desc" || subject === "description") {
      await this.client
        .groupUpdateDescription(M.groupMetadata.id, value.toString())
        .then(() => {
          return void M.reply("Group description updated");
        })
        .catch((e) => {
          console.log(e);
          return void M.reply("Error while updating");
        });
    }
    return;
  };
}
