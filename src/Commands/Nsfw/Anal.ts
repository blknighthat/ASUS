/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { MessageType, MimeType } from "@adiwajshing/baileys";

@Command( "anal", {
    description: `Know it yourself.`,
    aliases: ["anal"],
    category: "nsfw",
    usage: `anal`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    let caption = "";
    caption += `🌟`;
    if (!(await this.client.getGroupData(M.from)).nsfw)
      return void M.reply(
        `Don't be a pervert, Baka! This is not an NSFW group.`
      );
    M.reply(
      await this.client.util.GIFBufferToVideoBuffer(
        await this.client.getBuffer(
          (
            await this.client.fetch<{ url: string }>(
              `https://nekos.life/api/v2/img/anal`
            )
          ).url
        )
      ),
      MessageType.video,
      Mimetype.gif,
      [caption],
      caption
    );
  };
}
