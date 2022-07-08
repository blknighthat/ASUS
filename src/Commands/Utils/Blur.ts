import { MessageType } from "@adiwajshing/baileys";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import jimp from "jimp";

@Command( "blur", {
    description: "Blurs the given image or pfp",
    category: "utils",
    usage: `blur [(as caption | quote)[image] | @mention]`,
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
    const level = joined.trim() || "5";
    const img = await jimp.read(image as string);
    img.blur(isNaN(level as unknown as number) ? 5 : parseInt(level));
    img.getBuffer(`image/png`, (err, buffer) => {
      if (err) return void M.reply(err?.message || `Couldn't blur the image`);
      M.reply(buffer, MessageType.image);
    });
  };
}
