# Discord.js-Advanced-Command-Handler

It is a simple event and command handler for Discord.js V14. 

[![Download](https://img.shields.io/badge/Download-v1.3.0-blue?style=flat-square)](https://github.com/MastiderMast/Discord.js-Advanced-Command-Handler/releases/tag/1.3.0)

## Prerequisites
1. MySQL database is required!
2. Node.js v18.7.0 or newer is required.

## Installation
1. run this SQL create code on your database:
```
CREATE TABLE `guilds` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
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
4. Rename the `config.json.TEMPLATE` to `config.json`
5. Run the bot with the following command: `npm start` or `node .`