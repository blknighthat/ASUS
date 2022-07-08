import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { MessageType, MimeType } from "@adiwajshing/baileys";

@Command( "bank", {
    description: "Displays user-bank",
    category: "economy",
    usage: `bank`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const user = M.sender.jid;
    const result = await (await this.client.getUser(user)).bank;
    const buttons = [
      {
        buttonId: "wallet",
        buttonText: { displayText: `${this.client.config.prefix}wallet` },
        type: 1,
      },
    ];

    const buttonMessage: any = {
      contentText: `🏦 *Bank | ${M.sender.username}*\n\n🪙 *Gold: ${result}*`,
      footerText: "© 𝖠𝗌𝗎𝗇𝖺 2022",
      buttons: buttons,
      headerType: 1,
    };
    await M.reply(buttonMessage, MessageType.buttonsMessage);
  };
}
