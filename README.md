# mock-tweet-bot
Mock tweet bot for Discord, for fun!

Unlike other fake tweet bots, this bot uses image manipulation to create custom image and add sender's Discord profile, username, and display name (that you set in a same server where bot is in). This bot is lightweight and uses SQLite to store users' cooldown, persisting data even after sudden crash or shutdown.

# How to install
(This step-by-step list requires command line knowledge, but it can be used in any OS if NodeJS and NPM are supported in your OS)
1. Install [NodeJS](https://nodejs.org/en/download/package-manager) (It should come with NPM, otherwise install NPM), has to be at least NodeJS 18 or up.
2. Run `git clone https://github.com/KingColton1/mock-tweet-bot.git` to clone this repo into your server.
3. Run `npm install` to install required packages and dependencies.
4. Create a new `.sqlite` file, you can name it however you want. You do not need a program to make a sqlite file, simply create a new empty file and name that file. Example: `cooldown.sqlite`
5. Rename `.env.example` to `.env` and fill out necessary information in `.env` in order to run this bot.
6. Run `node index.js`
7. Have fun "tweeting" in your Discord!

Demo picture:
![image](https://github.com/user-attachments/assets/2e3f0010-5f8c-4f1c-b47f-e81f55012969)
