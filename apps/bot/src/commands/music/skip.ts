import { Cooldown, CooldownType } from "@slipher/cooldown";
import { Command, CommandContext, createStringOption, Declare, Middlewares, Options } from "seyfert";

@Declare({
    name: "skip",
    description: "Skip the current song.",
    botPermissions: ["SendMessages", "EmbedLinks", "ViewChannel"],
    aliases: ["s", "skipto"],
    integrationTypes: ["GuildInstall"],
    contexts: ["Guild"],
    props: {
        category: "music",
    },
})
@Middlewares(["checkNodes", "checkVoiceChannel", "checkVoicePermissions", "checkBotVoiceChannel", "checkPlayer", "checkPlaying", "checkQueue", "checkTracks"])
@Cooldown({
    type: CooldownType.User,
    interval: 1000 * 30,
    uses: {
        default: 3,
    },
})
export default class SkipCommand extends Command {
    async run(ctx: CommandContext<typeof options>) {
        const { player } = ctx;

        if (!player) return;

        const { to } = ctx.options;
        if (to) {
            const index = Number.parseInt(to, 10);
            if (Number.isNaN(index) || index < 0 || index >= player.queue.tracks.length) {
                return ctx.editOrReply({
                    embeds: [
                        {
                            color: ctx.client.config.colors.main,
                            description: "Invalid song number. Please provide a valid track index.",
                        },
                    ],
                    flags: 64,
                });
            }

            await player.skip(index, !player.get("autoplay"));
            return ctx.editOrReply({
                embeds: [
                    {
                        color: ctx.client.config.colors.main,
                        description: `${ctx.author.username} skipped to track ${index + 1}.`,
                    },
                ],
            });
        }


        return ctx.editOrReply({
            embeds: [
                {
                    color: ctx.client.config.colors.main,
                    description: `${ctx.author.username} skipped the current track.`,
                },
            ],
        });
    }
}
