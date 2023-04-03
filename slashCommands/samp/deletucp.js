const { SlashCommandBuilder } = require('@discordjs/builders');

const {
	createConnection
} = require("mysql");

const sql = createConnection({
	host: `localhost`,
	user: `root`,
	password: ``,
	database: `avrp`
});

module.exports = {
    data: new SlashCommandBuilder()
    .setName('deleteucp')
    .setDescription('Untuk Menghapus Ucp & Character Player')
    .addMentionableOption(option => option.setName('tag')
	    .setDescription('Tag anyone for delete UCP')
	    .setRequired(true)),
        async execute(client,interaction) {
        const tag = await interaction.options.getMentionable('tag');
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.reply({content: `\`\`\`\nYou are not admin, you can't use this command\`\`\``, ephemeral: true}); 
        if(tag) {
            sql.query(`SELECT * FROM ucp WHERE discordid = '${tag.id}'`, async (err, row) => {
                if(row.lenght > 1) {
                    await interaction.reply({content: `\`\`\`\nThe ucp is not registered yet\`\`\``, ephemeral: true});
                    return;
                }
                else {
                    const c1 = row[0].username;
                    sql.query(`DELETE FROM ucp WHERE username='${c1}`)

                }
            }) 
        }
    }
}