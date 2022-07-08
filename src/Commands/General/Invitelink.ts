import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { MessageType } from '@adiwajshing/baileys'

@Command( 'invitelink', {
    aliases: ['invite', 'link', 'linkgc'],
    description: 'Get the group invite link',
    category: 'general',
    usage: `invite`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        // check if Bot is the admin
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply(`I'm not an admin of this group.`)
        if ((await this.client.getGroupData(M.from)).invitelink) {
            const code = await this.client.groupInviteCode(M.from).catch(() => {
                return void M.reply('Could not get the invite link')
            })
            await this.client.sendMessage(
                M.sender.jid,
                `*Invite link:* https://chat.whatsapp.com/${code}`,
                MessageType.text
            )
            return void M.reply('📪Sent you the Group Link in personal message.')
        } else {
            return void M.reply(
                `Command not enabled by the admin.\nUse *${this.client.config.prefix}act invitelink* to enable it`
            )
        }
    }
}
