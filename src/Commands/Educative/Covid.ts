import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from 'axios'

@Command( 'covid', {
    description: 'get the covid-19 info of the current place',
    aliases: ['COVID'],
    category: 'educative',
    usage: `covid [name]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
        
        
        
        if (!joined) return void M.reply('🔎 Provide a place name')
        const term = joined.trim()
        await axios.get(`https://api.abirhasan.wtf/covid19/v1?country=${term}`)
        .then((response) => {
                // console.log(response);
                const text = `🦠 Covid Information of the place *${term}* is \n\n 🧪 *TotalTests:* ${response.data.TotalTests} \n 🎗 *ActiveCases:* ${response.data.ActiveCases} \n 🏥 *Confirmed:* ${response.data.Confirmed} \n 😳 *Critical:* ${response.data.Critical} \n ☘ *Recovered:* ${response.data.Recovered} \n 🧫 *NewCases:* ${response.data.NewCases} \n 💀 *NewDeaths:* ${response.data.NewDeaths} \n ✏ *TotalCases:* ${response.data.TotalCases} \n 🚩 *Country:* ${response.data.Country} `
                M.reply(text);
            })
            .catch(err => {
                M.reply(`🔍 Please provide a valid place name \n Error: ${err}`)
            }
            )
    };
}
