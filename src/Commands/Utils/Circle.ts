/** @format */

import Canvacord from "canvacord";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { ISimplifiedMessage } from "../../typings";

@Command( "circle", {
    description: "Will make the given image shape to circle",
    category: "utils",
    usage: `circle [(as caption | quote)[image] | @mention]`,
    cooldown: 5,
    exp: 30,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const image = await (M.WAMessage?.message?.imageMessage
      ? this.client.downloadMediaMessage(M.WAMessage)
      : M.quoted?.message?.message?.imageMessage
      ? this.client.downloadMediaMessage(M.quoted.message)
      : M.mentioned[0]
      ? this.client.getProfilePicture(M.mentioned[0])
      : this.client.getProfilePicture(M.quoted?.sender || M.sender.jid));
    if (!image) return void M.reply(`Couldn't fetch the required Image`);
    const result = await Canvacord.Canvacord.circle(image);
    await M.reply(
      result,
      MessageType.image,
      undefined,
      undefined,
      undefined,
      undefined
    );
  };
}
