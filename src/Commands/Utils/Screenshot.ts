import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from "axios";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";

@Command( "screenshot", {
    aliases: ["ss", "ssweb"],
    description: "Gives you the screenshot of the given url. ",
    category: "utils",
    usage: `screenshot [url]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!joined) return void (await M.reply(`Provide the url, Baka!`));
    const chitoge = joined.trim();
    return void M.reply(
      await request.buffer(
        `https://shot.screenshotapi.net/screenshot?&url=${chitoge}&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load`
      ),
      MessageType.image,
      undefined,
      undefined,
      `🌟 Here you go.\n`,
      undefined
    ).catch((reason: any) =>
      M.reply(`✖ An error occurred. Please try again later. ${reason}`)
    );
  };
}
