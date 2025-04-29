import { Cooldown, CooldownType } from "@slipher/cooldown";
import { Command, Declare, GuildCommandContext, Middlewares } from "seyfert";

@Declare({
    name: "pause",
    description: "Pause the current song.",
    integrationTypes: ["GuildInstall"],
    contexts: ["Guild"],
    botPermissions: ["SendMessages", "EmbedLinks", "ViewChannel"],
    props: {
        category: "music",
    },
})
@Middlewares(["checkNodes", "checkVoiceChannel", "checkVoicePermissions", "checkBotVoiceChannel", "checkPlayer"])
@Cooldown({
    type: CooldownType.User,
    interval: 1000 * 30,
    uses: {
        default: 3,
    },
})
export default class PauseCommand extends Command {
    async run(context: GuildCommandContext) {
        const { player } = context;

        if (!player) return;

        if (player?.paused) {
            return context.editOrReply({
                embeds: [
                    {
                        color: context.client.config.colors.main,
                        description: "The player is already paused.",
                    },
                ],
            });
        }

        await player.pause();

        return context.editOrReply({
            embeds: [
                {
                    color: context.client.config.colors.main,
                    description: `${context.author.username} successfully paused the player at ${msToTime(player.position)}.`,
                },
            ],
        });
    }
}

function msToTime(duration: number) {
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}