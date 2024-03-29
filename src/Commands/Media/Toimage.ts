import { MessageType, Mimetype } from "@adiwajshing/baileys";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import fs from "fs/promises";
import { tmpdir } from "os";
import { exec } from "child_process";
import { existsSync } from "fs";
import { promisify } from "util";
// import webp from 'node-webpmux'

@Command( "toimage", {
    aliases: ["toimg"],
    description: "sends image/gif of a sticker",
    category: "media",
    usage: `\toimg [(tag)[sticker]]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    let buffer;
    let exe = promisify(exec);

    if (M.quoted?.message?.message?.stickerMessage)
      buffer = await this.client.downloadMediaMessage(M.quoted.message);
    else if (M.quoted?.message?.message?.stickerMessage?.isAnimated)
      buffer = await this.client.downloadMediaMessage(M.WAMessage);
    if (!buffer)
      return void M.reply(`You didn't provide any sticker to convert`);
    const filename = `${tmpdir()}/${Math.random().toString(36)}`;
    try {
      await fs.writeFile(`${filename}.webp`, buffer);
      await exe(`ffmpeg -i ${filename}.webp ${filename}.png`);

      const imagebuffer = await fs.readFile(`${filename}.png`);
      console.log(filename);
      return void M.reply(imagebuffer, MessageType.image, undefined, undefined);
      /* only image works for now
		animated webp will give error 
		*/
    } catch (error) {
      async function tomp4(buffer: Buffer): Promise<Buffer> {
        const read = buffer;
        const destination = `./${Math.random().toString(32)}`;

        fs.mkdir(destination);

        const writeFileDest = destination + "/input.webp";
        const frames = destination + "/frames-%0d.png";
        await fs.writeFile(writeFileDest, read);

        await exe(`ffmpeg -i ${writeFileDest} ${frames}`);

        //  delay(60000)
        await exe(
          `ffmpeg -r 25 -i ${destination}/frames-%0d.png -c:v libx264 -pix_fmt yuv420p "${destination}/out.mp4"`
        );
        const buff = await fs.readFile(`${destination}/out.mp4`);
        //  await fs.rm(destination.slice(2), { recursive: true, force: true })
        console.log(buff);
        console.log(await existsSync(`${destination}/out.mp4`));
        return buff;
      }

      const animatedgif = await tomp4(buffer);

      return void M.reply(animatedgif, MessageType.video, undefined, undefined);
    }
  };
}
