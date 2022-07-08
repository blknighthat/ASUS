import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "exp", {
    description: "Displays User's Exp ⭐",
    category: "general",
    usage: `exp (@tag)`,
    aliases: ["xp"],
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);
    const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid;
    let username = user === M.sender.jid ? M.sender.username : "Your";
    if (!username) {
      // const contact = this.client.getContact(user)
      // username = contact.notify || contact.vname || contact.name || user.split('@')[0]
      username = user.split("@")[0];
    }
    return void (await M.reply(
      `*${username} Exp: ${(await this.client.getUser(user)).Xp || 0}*`
    ));
  };
}
