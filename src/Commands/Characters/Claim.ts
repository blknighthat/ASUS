import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import ms from "parse-ms-js";

@Command( "claim", {
    description: "Will claim the last sent character",
    category: "characters",
    usage: `claim`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const time = 10000;
    const cd = await (await this.client.getCd(M.sender.jid)).claim;
    if (time - (Date.now() - cd) > 0) {
      const timeLeft = ms(time - (Date.now() - cd));
      return void M.reply(
        `Woahh! Slow down, you can use this command again in *${timeLeft.seconds} second(s)*`
      );
    }
    const data = await (await this.client.getGroupData(M.from)).charaResponse;
    await this.client.DB.cd.updateOne(
      { jid: M.sender.jid },
      { $set: { claim: Date.now() } }
    );
    if (!data.claimable)
      return void M.reply(`There aren't any available characters to claim.`);
    const wallet = await (await this.client.getUser(M.sender.jid)).wallet;
    if (wallet < data.price)
      return void M.reply(
        `*You don't have sufficient amount of gold in your wallet to claim this character.*`
      );
    await this.client.reduceGold(M.sender.jid, data.price);
    await this.client.DB.user.updateMany(
      { jid: M.sender.jid },
      {
        $push: {
          gallery: {
            id: data.id,
            name: data.name,
            image: data.image,
            about: data.about,
            source: data.source,
          },
        },
      }
    );
    await this.client.DB.group.updateOne(
      { jid: M.from },
      { $set: { "charaResponse.claimable": false } }
    );
    return void M.reply(
      `🎉 You have claimed *${data.name}* from *${data.source}*.`
    );
  };
}
