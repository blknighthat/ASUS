import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'

@Command( 'define', {
    aliases: ['d'],
    description: 'Gives you the defination of the given word. ',
    category: 'educative',
    usage: `define [Word you want to search about]`,
    cooldown: 5,
    exp: 50,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        if (!joined) return void M.reply('Please provide a word .')
        const term = joined.trim()
        console.log(term,joined)
        await axios
            .get(
                `http://api.urbandictionary.com/v0/define?term=${term}`
            )
           .then((response) => {
                // console.log(response);
                const text = `📚 Defination of *${term}* is\n\n📖 *Defination :* ${response.data.list[0].definition.replace(/\[/g,'').replace(/\]/g,'')}\n\n💬 *Example :* ${response.data.list[0].example.replace(/\[/g,'').replace(/\]/g,'')}`
          M.reply(text)
                })
            .catch((err) => {
                M.reply(`Sorry, couldn't find any definations related to *${term}*.`)
            })
    }
}
