import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( 'promoteme', {
    description: 'promotes bot owner & mods',
    category: 'dev',
    usage: `promoteme [@mention | tag]`,
    modsOnly: true,
    aliases: ['pm'],
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply(`❌ Failed to ${this.config.command} as I'm not an admin`)
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        if (!M.mentioned.length) return void M.reply(`Please tag the users you want to ${this.config.command}`)
        M.mentioned.forEach(async (user) => {
            const usr = this.client.contacts[user]
            const username = usr.notify || usr.vname || usr.name || user.split('@')[0]
            if (M.groupMetadata?.admins?.includes(user)) M.reply(`❌ Skipped *${username}* as they're already an admin`)
            else {
                await this.client.groupMakeAdmin(M.from, [user])
                M.reply(`*🚥Status:*\n\n✅Promoted *${username}*, my MASTER.🐉`)
            }
        })
    }
}
