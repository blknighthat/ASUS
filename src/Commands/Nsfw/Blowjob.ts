import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { MessageType, Mimetype } from "@adiwajshing/baileys";

@Command( "blowjob", {
    description: `Just a random gif of girls sucking a sharp sword.`,
    aliases: ["bj"],
    category: "nsfw",
    usage: `blowjob`,
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
              `https://api.waifu.pics/nsfw/blowjob`
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
