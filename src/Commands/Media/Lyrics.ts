import { MessageType } from '@adiwajshing/baileys'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import Genius from 'genius-lyrics'
import request from '../../lib/request'
import yts from "yt-search";

@Command( 'lyrics', {
    description: 'Gives you the lyrics of the given song.',
    category: 'media',
    aliases: ['ly'],
    usage: `lyrics [song_name]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        if (!this.client.config.geniusKey)
			return void M.reply("No Genius Access Token set.");
        if (!joined) return void M.reply('Please give me a song name to fetch the lyrics, Baka!')
        const chitoge = joined.trim()
        const Client = new Genius.Client(this.client.config.geniusKey)
        const search = await Client.songs.search(chitoge)
        if(search.error) return void M.reply(`Couldn't find any matching song results.`)
        const lyrics = await search[0].lyrics()
        let text = `🎀 *Title: ${search[0].title}*\n\n`
            text += `🌐 *URL: ${search[0].url}*\n`
            M.reply(
							await request.buffer(search[0].image),
							MessageType.image,
							undefined,
							undefined,
							text,
							undefined
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
						).catch((reason: any) => M.reply(`${text}`));
            await M.reply(lyrics)
        };
    } 
