const { MessageEmbed , MessageActionRow,MessageButton,CommandInteraction, MessageAttachment} = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Account Registration'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.reply({content: `\`\`\`\nYou are not admin, you can't use this command\`\`\``, ephemeral: true});
        
        const file = new MessageAttachment(`./image/icon.png`);
        const pg = new MessageAttachment(`./image/ticket.png`);
        const Embed = new MessageEmbed()
        .setColor(0x0077dd)
        .setDescription('**Registration**\nHarap Gunakan Ticket Tool ini sebaik mungkin!\nClick Button Untuk Melakukan Registrasi\n\n**Registration Note:**\n[-] Akun Discord Minimal Berumur 14 Hari Untuk Registrasi\n[-] Masukan Nama Ucp Yang Valid (Bukan Nama Roleplay)\n[-] Jangan Gunakan Symbol Apapun Kecuali Angka\n[-] Jika Sudah Pernah Mendaftar Kamu Bisa Gunakan Reverif!')
// .setTitle('Click Butoon For Registrasi Account')
        .setAuthor({
            name: `Account Registration`,
            iconURL: 'attachment://icon.png'
        })
      //  .setURL('https://discord.gg/QauSGjcSRd')
       // .setThumbnail('attachment://icon.png')
      //  .setTimestamp()
        .setFooter({
            text: 'Luxury© 2023',
        //    iconURL: `attachment://ticket.png`
        });

        const Row = new MessageActionRow();

        const regbut = new MessageButton()
            .setCustomId('register')
            .setStyle('SECONDARY')
            .setEmoji(`📝`)
            .setLabel('Register!');
        
        const verbut = new MessageButton()
            .setCustomId('verify')
            .setStyle('SECONDARY')
            .setEmoji(`🔗`)
            .setLabel('Reverif');
        Row.addComponents(regbut, verbut);

        interaction.reply({embeds:[Embed], files: [file], components:[Row]})

    },
};