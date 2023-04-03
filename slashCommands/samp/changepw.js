const { SlashCommandBuilder } = require('@discordjs/builders');

const { 
    Modal, MessageAttachment, MessageEmbed, AttachmentBuilder,
    TextInputComponent, ShowModal, Discord,  MessageActionRow, SelectMenuBuilder, MessageButton, Interaction
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changepassword')
		.setDescription('For Change Account Password'),
	async execute(client, interaction) {

		const modal = new Modal()
		    .setCustomId('cpw')
			.setTitle('Change Password');

		
			const pwInput = new TextInputComponent()
            .setCustomId('pwInput')
            .setPlaceholder('Passwords...')
            .setLabel('Account Password')
            .setMaxLength('24')
            .setMinLength('5')
            .setStyle('SHORT');


		const box1 = new MessageActionRow().addComponents(pwInput)
		modal.addComponents(box1)
		await interaction.showModal(modal);
	}
};