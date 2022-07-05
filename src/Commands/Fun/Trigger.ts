import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import Canvas from "canvas";
import GIFEncoder from "gifencoder";
import { Sticker } from "wa-sticker-formatter";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

@Command( "trigger", {
    description: "Sends the triggered version of you",
    category: "fun",
    usage: `trigger [tag/caption image | @mention]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const getImage = async (image: string | Buffer, timeout = 15) => {
      const img = await Canvas.loadImage(image);
      const GIF = new GIFEncoder(256, 310);
      GIF.start();
      GIF.setRepeat(0);
      GIF.setDelay(timeout);
      const canvas = Canvas.createCanvas(256, 310);
      const ctx = canvas.getContext(`2d`);
      const BR = 20;
      const LR = 10;
      for (let i = 0; i < 9; i++) {
        ctx.clearRect(0, 0, 256, 310);
        ctx.drawImage(
          img,
          Math.floor(Math.random() * BR) - BR,
          Math.floor(Math.random() * BR) - BR,
          256 + BR,
          310 - 54 + BR
        );
        ctx.fillStyle = `#FF000033`;
        ctx.fillRect(0, 0, 256, 310);
        ctx.drawImage(
          await Canvas.loadImage(
            this.client.assets.get("triggered") || Buffer.from("")
          ),
          Math.floor(Math.random() * LR) - LR,
          310 - 54 + Math.floor(Math.random() * LR) - LR,
          256 + LR,
          54 + LR
        );
        GIF.addFrame(ctx);
      }
      GIF.finish();
      return GIF.out.getData();
    };
    try {
      const image = await M.downloadMediaMessage(M.message.message as proto.IMessage)
        else if (M.quoted && M.quoted.hasSupportedMediaMessage) buffer = await M.downloadMediaMessage(M.quoted.message)
        ? this.client.profilePictureUrl(M.quoted.sender)
        : M.mentioned
        ? this.client.profilePictureUrl(M.mentioned[0])
        : this.client.profilePictureUrl(M.sender.jid);
      const sticker = new Sticker(await getImage(image), {
        pack: `Triggered`,
        author: M.sender.username || `Chitoge`,
        type: "full",
        categories: ["💢"],
      });
      if (!sticker) return void M.reply(`I couldn't find an image to trigger.`);
      return void (await M.reply(await sticker.build(), 'sticker')
      );
    } catch (err) {
      console.log(err);
      M.reply(`Couldn't fetch the required Image.\n*Error* : ${err}`);
    }
  };
}