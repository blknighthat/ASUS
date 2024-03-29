/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { MessageType, MimeType } from "@adiwajshing/baileys";
@Command( "asuna", {
    description: "Displays the info",
    category: "general",
    usage: `asuna`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
		const becky =
			"https://www.linkpicture.com/q/Asuna-logo.jpg";
		return void this.client.sendMessage(
			M.from,
			{ url: becky },
			MessageType.image,
			{
				quoted: M.WAMessage,
				mimetype: Mimetype.jpeg,
				caption: `*🚀𝖠𝗌𝗎𝗇𝖺 𝖡𝗈𝗍𝗍𝗈*

⚜𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: Maintained version of Katsushika. 

🚥𝗦𝘁𝗮𝘁𝘂𝘀: Asuna is free to use & there is no script sold! Anyone gossiping to have the script have intentions of fraud & swindling you! BEWARE.

🧩𝗛𝗶𝗻𝘁: Asuna is not an open source project, therefore you can deploy a version of it;
https://github.com/Issa2001/Katsushika

📑𝗟𝗶𝗰𝗲𝗻𝘀𝗲: You may obtain a copy of the License at;
http://www.gnu.org/licenses/

(𝗚𝗡𝗨 𝗔𝗙𝗙𝗘𝗥𝗢 𝗚𝗘𝗡𝗘𝗥𝗔𝗟 𝗣𝗨𝗕𝗟𝗜𝗖 𝗟𝗜𝗖𝗘𝗡𝗦𝗘).
»𝖵𝖾𝗋𝗌𝗂𝗈𝗇 3.0 \n`,
			}
		);
	};
}
