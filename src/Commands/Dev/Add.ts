import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( 'add', {
    description: 'adds participant to group chats',
    category: 'dev',
    usage: `add [@mention | tag]`,
    aliases: ['add'],
    modsOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        const number = parsedArgs.joined.replace(/\D+/g,'').replace(/\s+/g,'').toString();
console.log(number) ;
        // let text = '*Action*\n\n'
        try{
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply(`❌ Failed to ${this.config.command} as I'm not an admin`)
        if (!number.length) return void M.reply(`Please write the user's number you want to ${this.config.command}`)
        this.client.isOnWhatsApp(`${number}@s.whatsapp.net`)
        if(!this.client.groupAdd(M.from,[`${number}@s.whatsapp.net`])) return void M.reply(`the person you are trying to add is not on whatsapp`)
        await M.reply(`successfully added the person`, undefined, undefined, [...M.mentioned, M.sender.jid])
        }catch{
            M.reply(`something went wrong`)
        }
    }
}
