import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

@Command( "loli", {
    description: `Will send you random loli image.`,
    aliases: ["loli"],
    category: "weeb",
    usage: `loli `,
    cooldown: 5,
    exp: 50,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => { {
    const images = JSON.parse(
      (this.client.assets.get("lolis") as Buffer).toString()
    ) as unknown as {
      lolis: {
        id: number;
        url: string;
      }[];
    };
    const loli = images.lolis[Math.floor(Math.random() * images.lolis.length)];
    const buffer = await request.buffer(loli.url).catch((e) => {
      return void M.reply(e.message);
    });
    while (true) {
      try {
        M.reply(
          buffer || "Could not fetch image. Please try again later",
          MessageType.image,
          undefined,
          undefined,
          `*Ya...*\n`,
          undefined
        ).catch((e) => {
          console.log(
            `This Error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`
          );
          // console.log('Failed')
          M.reply(`Could not fetch image. Here's the URL: ${loli.url}`);
        });
        break;
      } catch (e) {
        // console.log('Failed2')
        M.reply(`Could not fetch image. Here's the URL : ${loli.url}`);
        console.log(
          `This Error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
        );
      }
    }
    return void null;
  };
 }
}
