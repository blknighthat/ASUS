import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from 'axios'

@Command( 'shorturl', {
    description: 'Short your given url.',
    aliases: ['srurl'],
    category: 'utils',
    usage: `shorturl [Your url]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        if (!joined) return void M.reply('Give me a website link baka')
        const chitoge = joined.trim()
        await axios.get(`https://leyscoders-api.herokuapp.com/api/tinyurl?url=${chitoge}&apikey=dappakntlll`)
        .then((response) => {
                // console.log(response);
                const text = `🌐 *Your url* :${response.data.result}`
                M.reply(text);
            }).catch(err => {
                M.reply(`Sorry something went wrong.`)
            }
            )
    };
}
