import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import ms from "parse-ms-js";
import { MessageType } from "@adiwajshing/baileys";

@Command( "rob", {
    description: "Are you a good robber?",
    aliases: ["rob"],
    category: "economy",
    usage: `rob [tag/quote]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (M.from === "120363022488307199@g.us")
      return void M.reply(`You can't rob someone here. Go somewhere else`);
    const time = 900000;
    const cd = await (await this.client.getUser(M.sender.jid)).lastRob;
    if (time - (Date.now() - cd) > 0) {
      const timeLeft = ms(time - (Date.now() - cd));
      return void M.reply(
        `You can rob again after ${timeLeft.minutes} minute(s), *${timeLeft.seconds} second(s)*. Give it a break.`
      );
    }
    const user = M.sender.jid;
    const target =
      M.quoted && M.mentioned.length === 0
        ? M.quoted.sender
        : M.mentioned[0] || null;
    if (!target || target === M.sender.jid)
      return void M.reply(`Mention or quote the user.`);
    const results = [
      "robbed",
      "caught",
      "caught",
      "caught",
      "robbed",
      "caught",
      "caught",
      "caught",
      "caught",
      "caught",
    ];
    const wallet1 = await (await this.client.getUser(user)).wallet;
    const wallet2 = await (await this.client.getUser(target!)).wallet;
    if (wallet1 < 250)
      return void M.reply(
        `🟥 *You need at least 250 gold in your wallet to rob someone.*`
      );
    if (wallet2 < 250)
      return void M.reply(`Please leave this poor person alone.`);
    await this.client.DB.user.updateOne(
      { jid: user },
      { $set: { lastRob: Date.now() } }
    );
    const result = results[Math.floor(Math.random() * results.length)];
    if (result === "caught") {
      const gold = Math.floor(Math.random() * 250);
      await this.client.reduceGold(user, gold);
      await this.client.addGold(target!, gold);
      return void M.reply(
        `🟥 *You got caught and paid ${gold} gold to @${
          target?.split("@")[0]
        }*`,
        MessageType.text,
        undefined,
        [target || "", M.sender.jid]
      );
    } else {
      const gold = Math.floor(Math.random() * 250);
      await this.client.addGold(user, gold);
      await this.client.reduceGold(target!, gold);
      return void M.reply(
        `You robbed *@${
          target?.split("@")[0]
        }* and got away with *${gold} gold!*`,
        MessageType.text,
        undefined,
        [target || "", M.sender.jid]
      );
    }
  };
}
