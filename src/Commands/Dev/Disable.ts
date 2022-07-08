import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( 'disable', {
    description: 'Disables the given command from being used globally',
    category: 'dev',
    usage: `config [command] | (reason)`,
    modsOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        const split = joined.split('|')
        const key = split[0].toLowerCase().trim()
        if (!key) return void (await M.reply(`Provide the command you want to disable`))
        const feature = key === 'chatbot' ? key : ''
        if (feature) {
            const data = await this.client.getFeatures(feature)
            if (!data.state) return void M.reply(`🟨 *${this.client.util.capitalize(feature)}* is already *inactive*`)
            await this.client.DB.feature.updateOne({ feature: feature }, { $set: { ['state']: false } }).catch(() => {
                return void M.reply(`🟨 *${this.client.util.capitalize(feature)}* could not be disabled`)
            })
            this.client.features.set('chatbot', false)
            return void M.reply(`🟩 *${this.client.util.capitalize(feature)}* is now inactive`)
        }
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void (await M.reply(`No command found`))
        if (await this.client.DB.disabledcommands.findOne({ command: command.config.command }))
            return void M.reply(`${command.config.command} is already disabled`)
        await new this.client.DB.disabledcommands({
            command: command.config.command,
            reason: (split[1] || '').trim() || ''
        }).save()
        await M.reply(
            `*${this.client.util.capitalize(command.config.command)}* is now Disabled${
                split[1] ? ` for ${split[1]}` : ''
            }`
        )
    }
}
