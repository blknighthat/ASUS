import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from "axios";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

@Command( "animeme", {
    description: "Will send you random anime meme.",
    aliases: ["ameme"],
    category: "weeb",
    usage: `ameme`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const rnekol = [
      "wholesomeanimemes",
      "Animemes",
      "animememes",
      "goodanimemes",
    ];
    const rnekolc = rnekol[Math.floor(Math.random() * rnekol.length)];
    const { data } = await axios.get(
      "https://meme-api.herokuapp.com/gimme/" + rnekolc
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
          `Here you go ✨\n`,
          undefined
        ).catch((e) => {
          console.log(
            `This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`
          );
          // console.log('Failed')
          M.reply(`Could not fetch image. Here's the URL: ${data.url}`);
        });
        break;
      } catch (e) {
        // console.log('Failed2')
        M.reply(`Could not fetch image. Here's the URL : ${data.url}`);
        console.log(
          `This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
        );
      }
    }
    return void null;
  };
}
