import { getGuild } from "@repo/db";
import { createEvent } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";
import { getCommandInfoByName } from "../utils";

export default createEvent({
	data: { name: "messageCreate", once: false },
	async run(message, client, shardId) {
		if (message.author.bot) return;

		return;
	},
});
