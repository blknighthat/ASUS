import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( 'purge', {
    aliases: ['destruct'],
    description: 'Removes all group members',
    category: 'moderation',
    usage: `purge`,
    adminOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        if (
            M.groupMetadata?.owner !== M.sender.jid &&
            M.groupMetadata?.owner !== M.sender.jid.replace('s.whatsapp.net', 'c.us')
        )
            M.reply('Only the group owner can use this command')
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply("I can't remove without being an admin")
        if (!this.purgeSet.has(M.groupMetadata?.id || '')) {
            this.addToPurge(M.groupMetadata?.id || '')
            return void M.reply(
                "Are you sure? This will remove everyone from the group chat. Use this command again if you'd like to proceed."
            )
        }
        M.groupMetadata.participants.map(async (user) => {
            if (!user.isAdmin) await this.client.groupRemove(M.from, [user.jid])
        })
        await M.reply('*🚥Status:* \n\n💣destruction Successful')
        this.client.groupLeave(M.from)
    }

    purgeSet = new Set<string>()

    addToPurge = async (id: string): Promise<void> => {
        this.purgeSet.add(id)
        setTimeout(() => this.purgeSet.delete(id), 60000)
    }
}
