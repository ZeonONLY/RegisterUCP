const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed,MessageAttachment } = require("discord.js");

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
    .setName('infouser')
	.setDescription('cek player.')
    .addMentionableOption(option => option.setName('tag')
        .setDescription('Tag anyone for check UCP')
	    .setRequired(true)),


    async execute(client,interaction) {
       
        const tag = await interaction.options.getMentionable('tag');

        if(tag) {
            sql.query(`SELECT * FROM ucp_player WHERE discordID = '${tag.id}'`, async (err, row) => {
                if(row.length < 1) {
                    await interaction.reply({content: `\`\`\`\nakun player tidak dapat ditemukan\`\`\``, ephemeral: false});
                    return;
                }
                else {
                    const c1 = row[0].Name;
                    sql.query(`SELECT * FROM accounts WHERE pName = '${c1}'`, async (err, samp) =>{
                        if(samp.length < 1) {
                            interaction.reply(`<@${tag.id}> belum pernah login ke dalam game`);
                            return;
                        }
                        else {
                            const name = samp[0].pName;
                            const cash = samp[0].pCash;
                            const level = samp[0].pLevel;
                            const Saldo = samp[0].pBank;
                            const discord = row[0].discordID;
                        
                            const file = new MessageAttachment(`./image/anaxy.png`);
                            const embetUser = new MessageEmbed()
                            .setColor(0xffb19)
                            .setTitle(`INFO Player`)
                            .setURL(`https://youtu.be/aOec5gv_Pl8`)
                            .setAuthor({
                                name: `INDO VILAGE`,
                                iconURL: 'attachment://anaxy.png'
                            })
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
                            },
                            {
                                name: `Discord ID`,
                                value: `${discord}`,
                                inline: false
                            },)
                            .setThumbnail('attachment://anaxy.png')
                            .setTimestamp()
                            .setFooter({
                                text: 'anaxy team Administrator',
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
