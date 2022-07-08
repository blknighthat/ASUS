import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { MessageType } from "@adiwajshing/baileys";
import request from "../../lib/request";

@Command( "goldlb", {
    aliases: ["goldlb", "gleaderboard, lb --gold"],
    description: "Shows global gold LeaderBoard.",
    category: "general",
    usage: `goldlb (@tag)`,
      // aliases: ['gold'],
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);
    const user: any = M.mentioned[0] ? M.mentioned[0] : M.sender.jid;
    //  console.log(  await this.client.cookieStats(user))
    // await DB.user.findOne({user})
    const lb = await this.client.DB.user.find().sort({ wallet: -1 }).limit(10);
    const indexes = await this.client.DB.user.count();
    console.log(lb, indexes);
    //   M.reply(JSON.stringify(lb));

    // M.reply('total user heuhue :'+indexes.toString())
    let message = ["*ASUNA BOTTO🚀*:" + indexes.toString() + ""];
    let mention = [];
    let i = 0;
    for (const users of lb) {
      console.log(users.jid, "number");
      mention.push(users.jid);
      i++;
      console.log(i);
      const username = this.client.contacts[users.jid]
        ? this.client.contacts[users.jid].notify
        : this.client.contacts[users.jid]
        ? this.client.contacts[users.jid].vname
        : this.client.contacts[users.jid]
        ? this.client.contacts[users.jid].name
        : this.client.contacts[users.jid]
        ? this.client.contacts[users.jid].short
        : `@${users.jid.split("@")[0]}`;

      let text = `*#${i}*\n*🏮Username : ${username}*\n*🎉Experience*: ${users.Xp}\n*🏦Bank* : ${users.bank}\n*🪙Gold* : ${users.wallet}\n`;
      message.push(text);
    }
    console.log(message);
    M.reply(
      await request.buffer("https://www.linkpicture.com/q/Asunabotto.jpg"),
      MessageType.image,
      undefined,
      mention,
      message.join("\n\n")
    );
  };
}
