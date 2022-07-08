import { MessageType } from '@adiwajshing/baileys'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types' 

@Command( 'report', {
    aliases: ['rep'],
    description: 'Sends a report to the bot owner',
    category: 'general',
    usage: `report`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
             const term = joined.trim()
            await this.client.sendMessage(
               // enter your unique jid
`120363043430061496@g.us`,
                `*━━━❰ Asuna Report ❱━━━*\n\n📑Message: ${term} by *${M.sender.username}*\n\n📮Group: ${M.groupMetadata?.subject}*\n\n© 𝖠𝗌𝗎𝗇𝖺 2022`,
                MessageType.text
            );
            return void M.reply('🎉Successfully sent the report to bot moderators, action will be taken soon.')
    }
}
