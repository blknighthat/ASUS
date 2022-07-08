import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "happybirthday", {
    aliases: ["hbd", "hhp"],
    description: "use for birthday wish",
    category: "dev",
    modsOnly: true,
    usage: `happybirthday`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid
        let username = user === M.sender.jid ? M.sender.username : ''
        if (!username) {
            const contact = this.client.getContact(user)
            username = contact.notify || contact.vname || contact.name || user.split('@')[0]
        }
        let pfp: string
        try {
            pfp = await this.client.getProfilePicture(user)
        } catch (err) {
            M.reply(`Profile Picture not Accessible of ${username}`)
            pfp =
                'https://wallpaperaccess.com/full/5304840.png'
        }
        await M.reply(
            await request.buffer(
                pfp ||
                    'https://wallpaperaccess.com/full/5304840.png'
            ),
            MessageType.image,
            undefined,
            undefined,
            `Hey✨\n•We as the Sapphire group & I as Asuna we cheer you for another trip around the sun, the day is all yours pal.🤍May you receive the greatest of all joys & everlasting bliss.✨You are a wonderful gift yourself & you deserve the best.💘 Happy Birthday.🥰\n\n 🎉🍾🎂𝗛𝗮𝗽𝗽𝘆 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆🎂🍾🎉\n •Enjoy this special day as you turn an year older *@${user.split('@')[0]}*, TML😍❤\n\n`
        )
    }
}
