import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( 'revoke', {
    description: 'Revokes the group link.',
    category: 'moderation',
    usage: `revoke`,
    adminOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply("I can't revoke the group link without being an admin")
        await this.client.revokeInvite(M.from).catch(() => {
            return void M.reply('Failed to revoke the group link')
        })
        return void M.reply('*🚥Status:*\n\n⭕Link revoked')
    }
}
