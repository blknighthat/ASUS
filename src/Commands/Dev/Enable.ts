import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( 'enable', {
    description: 'Enables the given command globally',
    category: 'dev',
    usage: `enable [command]`,
    modsOnly: true,
    cooldown: 5,
    exp: 10,
    dm: true
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        const key = joined.toLowerCase().trim()
        if (!key) return void (await M.reply(`Provide the command you want to enable`))
        const feature = key === 'chatbot' ? key : ''
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (feature) {
            const data = await this.client.getFeatures(feature)
            if (data.state) return void M.reply(`🟨 *${this.client.util.capitalize(feature)}* is already *active*`)
            await this.client.DB.feature.updateOne({ feature: feature }, { $set: { state: true } }).catch(() => {
                return void M.reply(`🟨 *${this.client.util.capitalize(feature)}* failed to enable`)
            })
            this.client.features.set('chatbot', true)
            return void M.reply(`🟩 *${this.client.util.capitalize(feature)}* is now active`)
        }
        if (!command) return void (await M.reply(`No command found`))
        if (!(await this.client.DB.disabledcommands.findOne({ command: command.config.command })))
            return void M.reply(`${this.client.util.capitalize(command.config.command)} is already enabled`)
        await this.client.DB.disabledcommands.deleteOne({ command: command.config.command })
        await M.reply(`*${this.client.util.capitalize(command.config.command)}* is now Enabled`)
    }
}
