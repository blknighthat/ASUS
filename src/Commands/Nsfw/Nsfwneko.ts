import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from "axios";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

@Command( "nsfwneko", {
    description: `Will send you random nsfw neko image.`,
    aliases: ["nneko"],
    category: "nsfw",
    usage: `nneko`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    // fetch result of https://waifu.pics/api/nsfw/neko from the API using axios
    const { data } = await axios.get("https://api.waifu.pics/nsfw/neko");
    if (!(await this.client.getGroupData(M.from)).nsfw)
      return void M.reply(
        `Don't be a pervert, Baka! This is not an NSFW group.`
      );
    const buffer = await request.buffer(data.url).catch((e) => {
      return void M.reply(e.message);
    });
    while (true) {
      try {
        M.reply(
          buffer || "Could not fetch image. Please try again later",
          MessageType.image,
          undefined,
          undefined,
          `*Nya...*\n`,
          undefined
        ).catch((e) => {
          console.log(
            `This Error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`
          );
          // console.log('Failed')
          M.reply(`Could not fetch image. Here's the URL: ${data.url}`);
        });
        break;
      } catch (e) {
        // console.log('Failed2')
        M.reply(`Could not fetch image. Here's the URL : ${data.url}`);
        console.log(
          `This Error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
        );
      }
    }
    return void null;
  };
}
