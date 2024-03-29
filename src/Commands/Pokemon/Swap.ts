import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "swap", {
    description: `Swaps the index number of pokemons in your party.`,
    category: "pokemon",
    usage: `swap [pokemon_index_number_in_your_party] [pokemon_index_number_in_your_party]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (!joined)
      return void M.reply(
        `🟥 *Provide the index numbers of the pokemon in your party that you wanna swap. Example - :swap 3 1*`
      );
    const terms: any = joined.split(" ");
    if (!terms[1] || terms[1] === "")
      return void M.reply(`🟥 *You are doing it wrong. Example - :swap 1 4*`);
    const user = M.sender.jid;
    const data = await await this.client.getUser(user);
    if (
      isNaN(terms[0]) ||
      isNaN(terms[1]) ||
      terms[0] > 6 ||
      terms[0] < 1 ||
      terms[0] > data.party.length ||
      terms[1] > 6 ||
      terms[1] < 1 ||
      terms[1] > data.party.length
    )
      return void M.reply(
        `🟥 *Invalid party index number.* *Example - :swap 1 4*`
      );
    const i = terms[0] - 1;
    const w = terms[1] - 1;
    const t = data.party[i];
    data.party[i] = data.party[w];
    data.party[w] = t;
    await this.client.DB.user.updateOne(
      { jid: user },
      { $set: { party: data.party } }
    );
    await M.reply(`🟩 *Swapped ${terms[0]} & ${terms[1]}*`);
  };
}
