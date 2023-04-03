const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction } = require("discord.js");
const nixxyid = process.env['nixxyid'];
const ownerid = process.env['ownerid'];

const {
	createConnection
} = require("mysql");

const sql = createConnection({
	host: `localhost`,
	user: `root`,
	password: ``,
	database: `ravine`
});

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setadmin')
	.setDescription('This Command Only For Server Founder!')
    .addMentionableOption(option => option.setName('tag')
        .setDescription('Tag anyone for check data')
	    .setRequired(true))
    .addIntegerOption(option => option.setName('amount')
        .setDescription('Level 1-8')
        .setRequired(true)),

    async execute(client,interaction) {
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.reply({content: `\`\`\`\nYou are not admin, you can't use this command\`\`\``, ephemeral: true});
       // if(!interaction.member.options.getString('NixxyDev') === 'NixxyDev') return Interaction.reply({content: `Invalid Owner Code!`, ephemeral: true})
        if(!interaction.member.id === `${nixxyid}`|| interaction.member.id === `${ownerid}`) return interaction.reply({content: `You don't have acces to set admin level`, ephemeral: true})
            const tag = await interaction.options.getMentionable('tag');
            const amount = await interaction.options.getInteger('amount');
        if(tag) {
            if(amount) {
                sql.query(`SELECT * FROM ucp WHERE discordid = '${tag.id}'`, async (err, row) => {
                    if(row.length < 1) {
                        await interaction.reply({content: `\`\`\`\nakun player tidak dapat ditemukan\`\`\``, ephemeral: false});
                        return;
                    } else {
                        const c1 = row[0].Name;
                        sql.query(`UPDATE ucp SET admin = '${amount}' WHERE discordid='${tag.id}'`);
                        interaction.reply({content: `> **${interaction.member.displayName}** Has Set Administrator Level <@${tag.id}> To  **${amount}**`,ephemeral:false})
                        console.log(`command sukses update`.green)
                    }
                })
             }
        }   
    }
}