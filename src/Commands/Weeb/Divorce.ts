import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import ms from "parse-ms-js";

@Command( "divorce", {
    description: `Divorces your haigusha`,
    category: "weeb",
    usage: `divorce`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const user = M.sender.jid;
    const time = 60000;
    const cd = await (await this.client.getCd(user)).divorce;
    if (time - (Date.now() - cd) > 0) {
      const timeLeft = ms(time - (Date.now() - cd));
      return void M.reply(
        `Woahh! Slow down, you can use this command again in *${timeLeft.seconds} second(s)*`
      );
    }
    const l = await (await this.client.getUser(M.sender.jid)).haigusha;
    if (await !(await this.client.getUser(M.sender.jid)).married)
      return void M.reply(`You are already single.`);
    await this.client.DB.user.updateOne(
      { jid: M.sender.jid },
      {
        $set: {
          married: false,
        },
      }
    );
    await M.reply(`You divorced *${l.name}*.`);
  };
}
