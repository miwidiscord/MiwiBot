import { Client, LimitedMemoryAdapter} from "seyfert";
import { ActivityType, PresenceUpdateStatus } from "seyfert/lib/types";
import { join } from "node:path";
import { config } from "@repo/config";
import { CooldownManager } from "@slipher/cooldown";
import { Manager } from "./manager";
import { extendedContext } from "./context";
import { MessageManager } from "./messageManager";

export class BaseClient extends Client<true> {
	constructor() {
		super({
			getRC() {
				return config.rc;
			},
			allowedMentions: {
				parse: ["roles"],
			},
			context: extendedContext,
			presence(shardId: number) {
				return {
					activities: [
						{
							name: "miwi",
							type: ActivityType.Custom,
							state: `Watching /help | Shard #${shardId}`,
						},
					],
					afk: false,
					since: Date.now(),
					status: PresenceUpdateStatus.Online,
				};
			},
		});
	}
	public init() {
			cache: {
				adapter: new LimitedMemoryAdapter({
					channel: { limit: 500, expire: 4.32e7 },
					message: { limit: 500, expire: 4.32e7 },
				}),
			}
			
		);
		this.start().then(() => {
			this.cooldown = new CooldownManager(this);
			this.manager = new Manager(this);
			this.messageManager = new MessageManager(this);
			this.uploadCommands({ cachePath: join(process.cwd(), "cache", "seyfert_commands.json") });
		});
	}
}

