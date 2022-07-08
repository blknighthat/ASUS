/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { MessageType, MimeType } from "@adiwajshing/baileys";
@Command( "issa", {
    description: "Displays the info",
    category: "general",
    usage: `issa`,
    cooldown: 5,
    exp: 200,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
		const becky =
			"https://www.linkpicture.com/q/Issa-logo.jpg";
		return void this.client.sendMessage(
			M.from,
			{ url: becky },
			MessageType.image,
			{
				quoted: M.WAMessage,
				mimeType: MimeType.jpeg,
				caption: `Hey pal!🍃I'm Issa, a learner/student & an upcoming developer in the future.
            
📫𝙒𝙝𝙖𝙩𝙨𝘼𝙥𝙥;
Wa.me/254115175696
Wa.me/16156236963

⭕𝙂𝙞𝙩𝙝𝙪𝙗;
https://github.com/Issa2001

📮𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢;
https://instagram.com/__.i.s.s.a.__

🕸𝙏𝙚𝙡𝙚𝙜𝙧𝙖𝙢;
t.me/Issa2001

🟦𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠;
https://www.facebook.com/profile.php?id=100037298193290

🚀𝘿𝙞𝙨𝙘𝙤𝙧𝙙;
｟𝖢𝗈𝗆𝗂𝗇𝗀 𝖲𝗈𝗈𝗇｠

⪼𝖲𝖾𝖾 𝗒𝖺𝗁 💘`,
			}
		);
	};
}
