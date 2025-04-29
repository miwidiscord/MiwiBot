<p align="center">
  <img src="https://i.imgur.com/m7ESfbm.png" alt="MiwiBot Banner" width="300" />
</p>

<h1 align="center">🎵 MiwiBot</h1>

<p align="center">
  <strong>The perfect music bot for your Discord server.</strong><br/>
  High-quality music, custom playlists, filters, 24/7 playback and more. 🚀
</p>

<p align="center">
  <em>Built with <a href="https://github.com/tiramisulabs/seyfert">Seyfert</a> — a modern Discord framework by <a href="https://github.com/tiramisulabs">tiramisulabs</a>.</em>
</p>

---

## ✨ Features

- 🎶 High-quality music streaming  
- 🎧 Spotify, SoundCloud, YouTube support  
- 📃 Custom playlists  
- 🎚️ Audio filters (bass boost, 8D, nightcore, etc.)  
- 🕛 24/7 playback mode  
- 🛠️ Built with [Seyfert](https://github.com/tiramisulabs/seyfert)  
- 🔥 Powered by [TurboRepo](https://turbo.build/) for fast builds  

---

## 📦 Installation

```bash
git clone https://github.com/miwidiscord/MiwiBot.git
cd MiwiBot
yarn install
```

---

## ⚙️ Configuration

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Fill it with your bot credentials:

```env
DISCORD_APP_TOKEN="your-discord-bot-token"
DISCORD_APP_CLIENT_ID="your-client-id"
DISCORD_APP_CLIENT_SECRET="your-client-secret"
GUILD_IDS="guild-id-1,guild-id-2"
DEVELOPER_IDS="developer-id-1,developer-id-2"
PREFIX="!"
```

---

## 🛠️ Development

Run in development mode with hot-reloading:

```bash
yarn dev
```

---

## 📦 Build

Build the bot for production:

```bash
yarn build
```

---

## 🚀 Start

Start the production build:

```bash
yarn start
```

---

## 🧹 Clean

To clean output and cache:

```bash
yarn clean
# or deep clean everything
yarn clean:all
```

---

## 🛠️ Tech Stack

- [Seyfert](https://github.com/tiramisulabs/seyfert) (main framework)
- [TypeScript](https://www.typescriptlang.org/)
- [TurboRepo](https://turbo.build/)
- [BiomeJS](https://biomejs.dev/) (code formatting)
- [SWC](https://swc.rs/) (compiler)
- [Sentry](https://sentry.io/) (error tracking)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 💬 Support

Having issues or ideas?  
Feel free to open an [issue](https://github.com/miwidiscord/MiwiBot/issues)!


[![Powered by Seyfert](https://img.shields.io/badge/powered%20by-seyfert-4B275F?style=for-the-badge)](https://github.com/tiramisulabs/seyfert)
