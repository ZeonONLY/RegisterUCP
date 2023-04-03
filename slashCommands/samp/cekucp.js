const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const {
	createConnection
} = require("mysql");

const sql = createConnection({
	host: `localhost`,
	user: `root`,
	password: ``,
	database: `jawa5`
});

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cekucp')
	.setDescription('cek ucp player.')
    .addMentionableOption(option => option.setName('tag')
        .setDescription('Tag anyone for check ucp name')
	    .setRequired(true)),

    async execute(client,interaction) {
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.reply({content: `\`\`\`\nYou are not admin, you can't use this command\`\`\``, ephemeral: true});
        
        const tag = await interaction.options.getMentionable('tag');
       
        if(tag)
        {
            sql.query(`SELECT * FROM playerucp WHERE discordid = '${tag.id}'`, async (err, row) => {
                if(row.length < 1) {
                    await interaction.reply(`Ucp Account of <@${tag.id}> is not Exists!`);
                    return;
                }
                else {
                    return interaction.reply(`Ucp Account From <@${tag.id}> is **${row[0].Name}**`);
                }
            })
        }
    }
}
