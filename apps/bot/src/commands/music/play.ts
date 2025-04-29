import { Cooldown, CooldownType } from "@slipher/cooldown";
import { Command, createStringOption, Declare, GuildCommandContext, CommandContext, Middlewares, Options, TextBaseGuildChannel } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";

const ytregex = /nothing/;

const options = {
	query: createStringOption({
		description: "A url or search query to play.",
		required: true,
		autocomplete: async (interaction) => {
			return interaction.respond([
				{ name: "Not implemented", value: "notImplemented" },
			]);
		},
	}),
};

@Declare({
	name: "play",
	description: "Plays the provided song or search query",
	aliases: ["p"],
	botPermissions: ["SendMessages", "EmbedLinks", "ViewChannel"],
	integrationTypes: ["GuildInstall"],
	contexts: ["Guild"],
	props: {
		category: "music",
	},
})
@Options(options)
@Middlewares(["checkNodes", "checkVoiceChannel", "checkVoicePermissions", "checkBotVoiceChannel"])
@Cooldown({
	type: CooldownType.User,
	interval: 1000 * 30,
	uses: {
		default: 3,
	},
})
export default class PlayCommand extends Command {
	override async run(ctx: GuildCommandContext<typeof options>) {
		await ctx.editOrReply({
			flags: MessageFlags.Ephemeral,
			embeds: [
				{
					description: "This command is currently not available.",
					color: 0xff0000,
				},
			],
		});
	}

	async onOptionsError(context: CommandContext) {
		return context.editOrReply({
			embeds: [
				{
					color: 0xff0000,
					description: "Invalid usage.",
				},
			],
		});
	}
}
