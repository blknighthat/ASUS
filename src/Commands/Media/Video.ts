import { MessageType } from '@adiwajshing/baileys'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import yts from 'yt-search'
import YT from '../../lib/YT'


@Command( 'video', {
    description: '📹 play a video with just search term!',
    category: 'media',
    aliases: ['video'],
    usage: `video [term]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> =>{
        if (!joined) return void M.reply(' Provide a search term, Baka!')
        const term = joined.trim()
        const { videos } = await yts(term)
        if (!videos || videos.length <= 0) return void M.reply(`⚓ No Matching videos found for the term : *${term}*`)
        const video = new YT(videos[0].url, 'video')
        if (!video.url) return
        M.reply('Wait')
        this.client
            .sendMessage(M.from, await video.getBuffer(), MessageType.video, {
                quoted: M.WAMessage,
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: video.url
                    }
                }
            })
            .catch((reason: Error) => M.reply(`✖ An error occurred. Please try again later.`))
    }
}
