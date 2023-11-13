import { inspect } from 'util';
import { Client, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import config from '../../data/config.js';

const commandID = 'eval';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.addStringOption(option => option.setName('input').setDescription('The input to echo back'))
		.setName(commandID)
		.setDescription('Evaluate code'),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		try {
			if(interaction.user.id !== config.bot.owner) return interaction.reply('You do not have permission to use this command.');
			try {
				const input = interaction.options.getString('input');
				if(!input) return interaction.reply('Please provide input to evaluate.');

				const evaled = eval(input);
				const cleaned = await clean(evaled);

				await interaction.reply(`\`\`\`js\n${cleaned}\n\`\`\``);
			} catch (error) {
				await interaction.reply(`\`ERROR\` \`\`\`xl\n${error}\n\`\`\``);
			}

		} catch (error) {
			console.log(error);
		}
	}
};

const clean = async (text: string) => {

	if (text && text.constructor.name == 'Promise')
		text = await text;

	if (typeof text !== 'string')
		text = inspect(text, { depth: 1 });

	text = text
		.replace(/`/g, '`' + String.fromCharCode(8203))
		.replace(/@/g, '@' + String.fromCharCode(8203));
	return text;
};