const { MessageEmbed , MessageActionRow,MessageButton,CommandInteraction, MessageAttachment} = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('cspanel')
    .setDescription('Send Character Story ember/panel'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.reply({content: `\`\`\`\nYou are not admin, you can't use this command\`\`\``, ephemeral: true});
        
        const file = new MessageAttachment(`./image/ravine.png`);
        const Embed = new MessageEmbed()
        .setColor(0x0077dd)
        .setThumbnail('attachment://ravine.png')
        .setDescription('[-] Character Story Minimal 3-4 Paragraf\n[-] Gunakan EYD yang benar\n[-] Staff tidak menerima story yang berantakan\n[-] Story tidak berisi dark story')
// .setTitle('Click Butoon For Registrasi Account')
        .setAuthor({
            name: `Character Story`,
            iconURL: 'https://media.discordapp.net/attachments/1058578616021172366/1070857474309115904/1f4cb.png'
        })
      //  .setURL('https://discord.gg/QauSGjcSRd')
       // .setThumbnail('attachment://ravine.png')
      //  .setTimestamp()
        .setFooter({
            text: 'Sot © 2023',
        })
        const Row = new MessageActionRow()
        Row.addComponents(
            new MessageButton()
            .setCustomId('cs')
            .setStyle('SECONDARY')
            .setEmoji(`📝`)
            .setLabel('Input Character Story!')
        );
        interaction.reply({embeds:[Embed], files: [file], components:[Row]})

    },
};