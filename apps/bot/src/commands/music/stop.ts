import { Cooldown, CooldownType } from "@slipher/cooldown";
import { Command, Declare, GuildCommandContext, Middlewares } from "seyfert";

@Declare({
	name: "stop",
	description: "Stops the current song and clears the queue.",
	integrationTypes: ["GuildInstall"],
	contexts: ["Guild"],
	botPermissions: ["SendMessages", "EmbedLinks", "ViewChannel"],
	props: {
		category: "music",
	},
})
@Middlewares(["checkNodes", "checkVoiceChannel", "checkVoicePermissions", "checkBotVoiceChannel", "checkPlayer", "checkPlaying"])
@Cooldown({
	type: CooldownType.User,
	interval: 1000 * 30,
	uses: {
		default: 3,
	},
})
export default class StopCommand extends Command {
	async run(context: GuildCommandContext) {
		const { player } = context;

		if (!player) return;

		await player.stopPlaying(true);

		return context.editOrReply({
			embeds: [
				{
					color: context.client.config.colors.main,
					description: `${context.author.username} successfully stopped the player and cleared the queue.`,
				},
			],
		});
	}
}
