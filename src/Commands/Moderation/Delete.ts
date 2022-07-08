import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "delete", {
    description: "Deletes the quoted Message",
    aliases: ["del"],
    category: "moderation",
    usage: `delete`,
    adminOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!M?.quoted?.message)
      return void M.reply("Quote the message you want to delete");
    if (M.quoted.sender !== this.client.user.jid)
      return void M.reply(
        `Do you want me to delete the message of a random member?`
      );
    await this.client.deleteMessage(M.from, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id: (M.quoted.message as any).stanzaId,
      remoteJid: M.from,
      fromMe: true,
    });
  };
}
