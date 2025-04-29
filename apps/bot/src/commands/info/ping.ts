import { db } from "@repo/db";
import { Cooldown, CooldownType } from "@slipher/cooldown";
import { Declare, Command, type CommandContext } from "seyfert";

@Declare({
	name: "ping",
	description: "Show latency with Discord",
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
export default class PingCommand extends Command {
	async run(ctx: CommandContext) {
		const wsPing = Math.floor(ctx.client.gateway.latency);
		const clientPing = Math.floor(Date.now() - (ctx.message ?? ctx.interaction)!.createdTimestamp);
		const dbLatency = async () => {
			const start = performance.now();
			await db.execute("SELECT * FROM guilds LIMIT 10000");
			return (performance.now() - start).toFixed(2);
		};
		return await ctx.editOrReply({
			embeds: [
				{
					color: ctx.client.config.colors.main,
					author: { name: ctx.client.me.tag, icon_url: ctx.client.me.avatarURL() },
					description: `:heartpulse: Heartbeat: **${wsPing}** ms\n:stopwatch: Client: **${clientPing}** ms\n:ping_pong: Database: **${(await dbLatency()).toString()}** ms`,
					footer: { text: `Shard: ${ctx.shardId + 1}/${ctx.client.gateway.totalShards}` },
				},
			],
		});
	}
}
