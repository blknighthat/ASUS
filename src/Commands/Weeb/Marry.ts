import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import ms from "parse-ms-js";

@Command( "marry", {
    description: `Will marry the recently summoned haigusha.`,
    category: "weeb",
    usage: `marry`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const time = 60000;
    const user = M.sender.jid;
    const cd = await (await this.client.getCd(user)).marry;
    if (time - (Date.now() - cd) > 0) {
      const timeLeft = ms(time - (Date.now() - cd));
      return void M.reply(
        `Woahh! Slow down, you can use this command again in *${timeLeft.seconds} second(s)*`
      );
    }
    const l = await (await this.client.getUser(M.sender.jid)).haigusha;
    if (
      await !(
        await this.client.getGroupData(M.from)
      ).haigushaResponse.claimable
    )
      return void M.reply(
        `There are no characters around to marry. Use ${this.client.config.prefix}haigusha to summon one.`
      );
    if (await (await this.client.getUser(M.sender.jid)).married)
      return void M.reply(`You are already married to *${l.name}*.`);
    const type = await (
      await this.client.getGroupData(M.from)
    ).haigushaResponse;
    await this.client.DB.group.updateOne(
      { jid: M.from },
      {
        $set: {
          "haigushaResponse.claimable": false,
        },
      }
    );
    await this.client.DB.user.updateMany(
      { jid: M.sender.jid },
      {
        $set: {
          "haigusha.name": type.name,
          "haigusha.id": type.id,
          married: true,
        },
      }
    );
    await M.reply(`🎉 You are now married with *${type.name}*.`);
  };
}
