import { MessageType } from '@adiwajshing/baileys'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'

@Command( 'pinterest', {
    aliases: ['pi', 'pin'],
    description: 'Search wallpaper from pinterest.com. ',
    category: 'media',
    usage: `pinterest [name]`,
    cooldown: 5,
    exp: 10,
    dm: true
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
		if (!joined)
			return void (await M.reply(`Give me a term to search, Baka!`));
		const chitoge: any = joined.trim().split("|");
		const term: string = chitoge[0];
		const amount: number = chitoge[1];
		if (!amount)
			return void M.reply(
				`Give me the number , Baka!\n\nExample: *${this.client.config.prefix}pin tomioka|5*`
			);
		if (amount > 20)
			return void M.reply(`Do you want me to spam in this group?`);
   
         const { data } = await axios.get(`https://hanzz-web.herokuapp.com/api/pinterest?query=${term}`)
        if (data.result[0] == undefined) return void M.reply("404 error")
        const buffer = await request.buffer(data.result[Math.floor(Math.random() * data.result.length)]).catch((e) => {
            return void M.reply(e.message)
        })
        for (let i = 0; i < amount; i++) {
			const res = `*🌟 Here you go.*`;
			this.client.sendMessage(
				M.from,
				{ url: data.result[Math.floor(Math.random() * data.result.length)] },
				MessageType.image,
				{
					quoted: M.WAMessage,
					caption: `${res}`,
				}
			);
		}
}
}
