import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "schara", {
    description: `Swaps the index number of characters in your gallery.`,
    category: "characters",
    usage: `schara [character_index_number_in_your_gallery] [character_index_number_in_your_gallery]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!joined)
      return void M.reply(
        `🟥 *Provide the index numbers of the characters in your gallery that you wanna swap. Example - ${this.client.config.prefix}schara 3 1*`
      );
    const terms: any = joined.split(" ");
    if (!terms[1] || terms[1] === "")
      return void M.reply(
        `🟥 *You are doing it wrong. Example - ${this.client.config.prefix}schara 1 4*`
      );
    const user = M.sender.jid;
    const data = await await this.client.getUser(user);
    if (
      isNaN(terms[0]) ||
      isNaN(terms[1]) ||
      terms[0] < 1 ||
      terms[0] > data.gallery.length ||
      terms[1] < 1 ||
      terms[1] > data.gallery.length
    )
      return void M.reply(
        `🟥 *Invalid gallery index number.* *Example - ${this.client.config.prefix}swap 1 4*`
      );
    const i = terms[0] - 1;
    const w = terms[1] - 1;
    const t = data.gallery[i];
    data.gallery[i] = data.gallery[w];
    data.gallery[w] = t;
    await this.client.DB.user.updateOne(
      { jid: user },
      { $set: { gallery: data.gallery } }
    );
    await M.reply(`🟩 *Swapped ${terms[0]} & ${terms[1]}*`);
  };
}
