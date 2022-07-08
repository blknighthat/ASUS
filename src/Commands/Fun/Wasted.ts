/** @format */

import Canvacord from "canvacord";
import { MessageType } from "@adiwajshing/baileys";
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command( "wasted", {
    description: "You just got wasted",
    category: "fun",
    usage: `wasted [tag/quote]`,
    cooldown: 5,
    exp: 10,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message, args: IArgs): Promise<void> => {
		const image = await (M.WAMessage?.message?.imageMessage
			? this.client.downloadMediaMessage(M.WAMessage)
			: M.quoted?.message?.message?.imageMessage
			? this.client.downloadMediaMessage(M.quoted.message)
			: M.mentioned[0]
			? this.client.getProfilePicture(M.mentioned[0])
			: this.client.getProfilePicture(M.quoted?.sender || M.sender.jid));
		if (!image) return void M.reply(`Couldn't fetch the required Image`);
		const result = await Canvacord.Canvacord.wasted(image);
		await M.reply(
			result,
			MessageType.image,
			undefined,
			undefined,
			undefined,
			undefined
		);
	};
}
