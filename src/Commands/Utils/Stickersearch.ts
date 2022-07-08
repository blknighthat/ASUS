import { MessageType, Mimetype } from '@adiwajshing/baileys'
import request from '../../lib/request'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from 'axios'
import { Sticker, Categories, StickerTypes } from 'wa-sticker-formatter'

@Command( 'stickersearch', {
    aliases: ['ssh', 'ssc'],
    description: 'Search sticker. ',
    category: 'utils',
    usage: `stickersearch [keywords]`,
    cooldown: 5,
    exp: 10,
    dm: true
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        
        if (!joined) return void M.reply('Provide the keywords you wanna search, Baka!')
        const cara = joined.trim()
        console.log(cara)
        
        const { data } = await axios.get(`https://g.tenor.com/v1/search?q=${cara}&key=LIVDSRZULELA&limit=8`)
        
if ((data as { error: string }).error) return void (await M.reply('Sorry, couldn\'t find'))
        //const i = Math.floor(Math.random() * data.result.length)
const b = `${data.results?.[Math.floor(Math.random() * data.results.length)]?.media[0]?.mp4?.url}`

        const sticker: any = await new Sticker(b, {
			pack: "𝘔𝘺𝘵𝘩𝘪𝘤🈲",
			author: "İşşa☦",
			quality: 90,
			type: "crop",
			categories: ["🎊"],
		});

      await M.reply(
			await sticker.build(),
			MessageType.sticker,
			Mimetype.webp,)
}





}
