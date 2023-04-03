const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed,MessageAttachment } = require("discord.js");

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
    .setName('charinfo')
	.setDescription('Check Player Stats')
    .addMentionableOption(option => option.setName('tag')
        .setDescription('Tag anyone for check UCP')
	    .setRequired(true)),


    async execute(client,interaction) {
       
        const tag = await interaction.options.getMentionable('tag');

        if(tag) {
            sql.query(`SELECT * FROM playerucp WHERE discordid = '${tag.id}'`, async (err, row) => {
                if(row.length < 1) {
                    await interaction.reply({content: `\`\`\`\nakun player tidak dapat ditemukan\`\`\``, ephemeral: false});
                    return;
                }
                else {
                    const c1 = row[0].Name;
                    sql.query(`SELECT * FROM players WHERE username = '${c1}'`, async (err, samp) =>{
                        if(samp.length < 1) {
                            interaction.reply(`<@${tag.id}> belum pernah login ke dalam game`);
                            return;
                        }
                        else {
                            const name = samp[0].username;
                            const cash = samp[0].money;
                            const level = samp[0].level;
                            const Saldo = samp[0].bmoney;
                            const discord = row[0].discordid;
                        
                            const file = new MessageAttachment(`./image/anaxy.png`);
                            const embetUser = new MessageEmbed()
                            .setColor(0x09303f)
                            .setTitle(`Character Information`)
                            .addFields({
                                name: `Name`,
                                value: `${name}`,
                                inline: false
                            },{
                                name: `Money`,
                                value: `Rp.${cash}`,
                                inline: false
                            },
                            {
                                name: `Level`,
                                value: `${level}`,
                                inline: false
                            },{
                                name: `Saldo Bank`,
                                value: `Rp.${Saldo}`,
                                inline: false
                            },{
                                name: 'Mask ID',
                                value: `${mask}`,
                                inline: false
                            },
                            {
                                name: `Discord ID`,
                                value: `${discord}`,
                                inline: false
                            },)
                            .setThumbnail('attachment://anaxy.png')
                            .setTimestamp()
                            .setFooter({
                                text: 'Administrator Team',
                                iconURL: `attachment://anaxy.png`
                            })
                            await interaction.reply({embeds:[embetUser], files:[file]})
                        }
                    })
                }
            }) 
        }
    }
}
