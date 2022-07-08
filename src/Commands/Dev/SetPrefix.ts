import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "setprefix", {
    description: "Will replace the old prefix with the given term",
    category: "dev",
    usage: `setprefix [new_prefix]`,
    modsOnly: true,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
    const newprefix = joined.trim().split(" ")[0].toLowerCase();
    if (!newprefix)
      return void (await M.reply(
        `Please provide the new prefix.\n\n*Example: ${this.client.config.prefix}setprefix $`
      ));
    this.client.config.prefix = newprefix;
    const text = `✅ *Successfully changed the prefix to ${newprefix}.*`;
    M.reply(text);
  };
}
