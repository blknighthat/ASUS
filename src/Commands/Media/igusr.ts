import { MessageType } from '@adiwajshing/baileys'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'

@Command( 'iguser', {
    aliases: ['ig'],
    description: 'Get the info of a user from ig ',
    category: 'media',  
    usage: `iguser [name]`,
    cooldown: 5,
    exp: 10,
    dm: true
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        if (!joined) return void M.reply('Provide the keywords you wanna search, Baka!')
        const chitoge = joined.trim()
        console.log(chitoge)
        const { data } = await axios.get(`https://api.popcat.xyz/instagram?user=${chitoge}`)
        if ((data as { error: string }).error) return void (await M.reply('Sorry, couldn\'t find'))
        const buffer = await request.buffer(data.profile_pic).catch((e) => {
            return void M.reply(e.message)
        })
        while (true) {
            try {
                M.reply(
                    buffer || '🌟 An error occurred. Please try again later',
                    MessageType.image,
                    undefined,
                    undefined,
                    `✔ *Verified*:${data.verified}\n🗣 *Private*:${data.private}\n🎛 *Postcount*:${data.posts}\n🍃 *Following*:${data.following}\n🗻 *Followers*:${data.followers}\n📖 *Bio*:${data.biography}\n📃 *Fullname*:${data.full_name}\n🀄 *Username*: ${data.username}\n`,
                    undefined
                ).catch((e) => {
                    console.log(`This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`)
                    // console.log('Failed')
                    M.reply(`🌟An error occurred. Please try again later.`)
                })
                break
            } catch (e) {
                // console.log('Failed2')
                M.reply(`An error occurred. Please try again later.`)
                console.log(`This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`)
            }
        }
        return void null
    }
}
