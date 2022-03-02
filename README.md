# Discord.js-Advanced-Command-Handler

It is a simple event and command handler for Discord.js V13. 

| Version | Custom Server Prefix | Download |
|-|-|-|
| 1.0.0 | ❌ | [![Download](https://img.shields.io/badge/Download-v1.0.0-blue?style=flat-square)](https://github.com/MastiderMast/Discord.js-Advanced-Command-Handler/releases/tag/1.0.0) |
| 1.1.1 | ❌ | [![Download](https://img.shields.io/badge/Download-v1.1.1-blue?style=flat-square)](https://github.com/MastiderMast/Discord.js-Advanced-Command-Handler/releases/tag/1.1.1) | 
| 1.2.0 | ✅ | [![Download](https://img.shields.io/badge/Download-v1.2.0-blue?style=flat-square)](https://github.com/MastiderMast/Discord.js-Advanced-Command-Handler/releases/tag/1.2.0) | 

## Prerequisites
1. MySQL database is required!
2. Node.js 16.6.0 or newer is required.

## Installation
1. run this SQL create code on your database:
```
CREATE TABLE `guilds` (
	`id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
	`guildid` VARCHAR(50) NULL DEFAULT '0' COLLATE 'utf8mb4_0900_ai_ci',
	`prefix` VARCHAR(50) NULL DEFAULT '!' COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `guildid` (`guildid`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;
```
2. Update your token and MySQL connection information in the config.
3. Run the following command to install the package: `npm install`
4. Rename teh `config.json.TEMPLATE` to `config.json`
5. Run the bot with the following command: `npm start` or `node .`
### Credits
[I used his good code as a basis](https://github.com/Ferotiq/Discord.JS-13-Tutorial).
