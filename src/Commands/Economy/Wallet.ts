import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { MessageType, MimeType } from "@adiwajshing/baileys";

@Command( "wallet", {
    description: "Displays user-wallet",
    category: "economy",
    usage: `wallet`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const user = M.sender.jid;
    const result = await (await this.client.getUser(user)).wallet;
    const buttons = [
      {
        buttonId: "bank",
        buttonText: { displayText: `${this.client.config.prefix}bank` },
        type: 1,
      },
    ];

    const buttonMessage: any = {
      contentText: `👛 *Wallet | ${M.sender.username}*\n\n🪙 *Gold: ${result}*`,
      footerText: "© 𝖠𝗌𝗎𝗇𝖺 2022",
      buttons: buttons,
      headerType: 1,
    };
    await M.reply(buttonMessage, MessageType.buttonsMessage);
  };
}
