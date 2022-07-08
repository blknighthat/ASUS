import { MessageType } from "@adiwajshing/baileys";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "pc", {
    aliases: ["pc"],
    description: "Will display user's pokemon pc",
    category: "pokemon",
    usage: `pc`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const data = await (await this.client.getUser(M.sender.jid)).pc;
    const user = M.sender.jid;
    let username = user === M.sender.jid ? M.sender.username : "";
    if (!username) {
      const contact = this.client.getContact(user);
      username =
        contact.notify || contact.vname || contact.name || user.split("@")[0];
    }
    if (data.length < 1)
      return void M.reply(`You don't have any pokemon in your pc.`);
    let text = `*💻 ${username}'s PC*\n\n`;
    for (let i = 0; i < data.length; i++) {
      text += `*#${i + 1} ${this.client.util.capitalize(data[i].name)}*\n`;
    }
    const buttons = [
      {
        buttonId: "party",
        buttonText: { displayText: `${this.client.config.prefix}party` },
        type: 1,
      },
    ];
    interface buttonMessage {
      contentText: string;
      footerText: string;
      buttons: string[];
      headerType: number;
    }
    const buttonMessage: any = {
      contentText: `${text}`,
      footerText: "© 𝖠𝗌𝗎𝗇𝖺 2022",
      buttons: buttons,
      headerType: 1,
    };
    await M.reply(buttonMessage, MessageType.buttonsMessage);
  };
}
