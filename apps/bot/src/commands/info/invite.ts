import { Cooldown, CooldownType } from "@slipher/cooldown";
import { Declare, Command, type CommandContext, Button, ActionRow } from "seyfert";
import { ButtonStyle } from "seyfert/lib/types";

@Declare({
	name: "invite",
	description: "Get the bot invite link",
	botPermissions: ["SendMessages", "EmbedLinks", "ViewChannel"],
	props: {
		category: "info",
	},
})
@Cooldown({
	type: CooldownType.User,
	interval: 1000 * 30,
	uses: {
		default: 3,
	},
})
export default class InviteCommand extends Command {
	async run(ctx: CommandContext) {
		const buttonRow = new ActionRow<Button>().addComponents(new Button().setLabel("Invite").setStyle(ButtonStyle.Link).setURL(ctx.client.config.links.invite));

		return ctx.editOrReply({
			embeds: [
				{
					color: ctx.client.config.colors.main,
					description: `Hello, ${ctx.author.username}! You can invite me to your server using the button below! or click [here](${ctx.client.config.links.invite}) to invite me to your server!`,
				},
			],
			components: [buttonRow],
		});
	}
}
