import { MessageType, MimeType } from '@adiwajshing/baileys'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( 'support', {
    aliases: ['support'],
    description: 'Gets the support group links',
    category: 'general',
    usage: `Support`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        (await this.client.sendMessage(
        M.sender.jid,
                `*📮𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝗚𝗿𝗼𝘂𝗽 𝗟𝗶𝗻𝗸𝘀*
「Sapphire: RE🈲」:\n\nhttps://chat.whatsapp.com/D1M6zr0tF7v2N30HfEJPdp\n\n「Sapphire: Casino💰」:\n\nhttps://chat.whatsapp.com/Jq4ToZByPSJHaxqAtb32sg\n\n 「Sapphire: Quiz📑」:\n\nhttps://chat.whatsapp.com/K0Y7Hepp3bW7TMk8wJH9bU`,
           MessageType.text
        ))
        const n = [
            './assets/images/asuna-yuuki.png','./assets/images/yuuki-asuna.jpeg',
        ]
        let rin = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: rin }, MessageType.image, {quoted:M.WAMessage,
            mimetype: MimeType.jpeg,
            caption: `Regarding this, I have sent you a personal message in your DM📪\n` }
        )

    }
}
