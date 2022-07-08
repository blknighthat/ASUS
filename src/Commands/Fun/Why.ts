import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from "axios";

@Command( "why", {
    description: "Asks you a *why* question.",
    category: "fun",
    usage: `why`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    await axios
      .get(`https://nekos.life/api/v2/why`)
      .then((response) => {
        // console.log(response);
        const text = `📝 *Question:* ${response.data.why}`;
        M.reply(text);
      })
      .catch((err) => {
        M.reply(`🔍 Error: ${err}`);
      });
  };
}
