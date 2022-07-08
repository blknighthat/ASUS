import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import ms from "parse-ms-js";

@Command( "daily", {
    description: "Claims daily gold",
    category: "economy",
    usage: `daily`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const user = M.sender.jid;
    const time = 86400000;
    const cd = await (await this.client.getUser(user)).lastDaily;
    if (time - (Date.now() - cd) > 0) {
      const timeLeft = ms(time - (Date.now() - cd));
      return void M.reply(
        `🟨 You claimed your daily gold recently. Claim again in *${timeLeft.hours} hour(s), ${timeLeft.minutes} minute(s), ${timeLeft.seconds} second(s)*`
      );
    }
    await this.client.addGold(user, 1000);
    await this.client.DB.user.updateOne(
      { jid: user },
      { $set: { lastDaily: Date.now() } }
    );
    return void M.reply(`🎉 *1000 gold* has been added to your wallet.`);
  };
}
