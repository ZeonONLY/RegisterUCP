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
    .setName('charlist')
    .setDescription('For check list the player')
    .addMentionableOption(option => option.setName('tag')
	    .setDescription('Tag anyone for show list character')
	    .setRequired(false)),


    async execute(client,interaction) {
        const tag = await interaction.options.getMentionable('tag');
        if(tag) {
            sql.query(`SELECT * FROM playerucp WHERE discordid = '${tag.id}'`, async (err, row) => {
                if(row.length < 1) {
                    await interaction.reply({content: `\`\`\`\nThe ucp is not registered yet\`\`\``, ephemeral: true});
                    return;
                }
                else {
                    const c1 = row[0].Name;
                    sql.query(`SELECT * FROM players WHERE ucp = '${c1}'`, async (err, samp) =>{
                        if(samp.length < 1) {
                            console.log(err);
                            return;
                        }
                        else {
                            const ucp = row[0].Name;
                            if(samp[0].pUcp == ucp) {
                                var character_1 = "None";
                            }
                            else {
                                var character_1 =  samp[0].pName;
                            }
                            if(samp[0].pUcp == ucp) {
                                var character_2 = "None";
                            }
                            else {
                                var character_2 =  samp[0].pName;
                            }
                            if(samp[0].pUcp == ucp) {
                                var character_3 = "None";
                            }
                            else {
                                var character_3 =  samp[0].pName;
                            }
                            await interaction.reply({content: `**List character UCP <@${tag.id}>:\`\`\`\n- ${character_1}\n- ${character_2}\n- ${character_3}\`\`\`**`});
                        }
                    })  
                }
            })
        }
        else {
            sql.query(`SELECT * FROM playerucp WHERE discordid = '${interaction.user.id}'`, async (err, row) => {
                if(row.length < 1) {
                    await interaction.reply({content: `\`\`\`\nThe ucp is not registered yet\`\`\``, ephemeral: true});
                    return;
                }
                else {
                    const c1 = row[0].Name;
                    sql.query(`SELECT * FROM players WHERE username = '${c1}'`, async (err, samp) =>{
                        if(samp.length < 1) {
                            console.log(err);
                            return;
                        }
                        else {
                            const ucp = samp[0].name;
                            if(samp[0].character_1 == ucp) {
                                var character_1 = "None";
                            }
                            else {
                                var character_1 =  samp[0].character_1;
                            }
                            if(samp[0].character_2 == ucp) {
                                var character_2 = "None";
                            }
                            else {
                                var character_2 =  samp[0].character_2;
                            }
                            if(samp[0].character_3 == ucp) {
                                var character_3 = "None";
                            }
                            else {
                                var character_3 =  samp[0].character_3;
                            }
                            await interaction.reply({content: `**List character UCP <@${tag.id}>:\`\`\`\n- ${character_1}\n- ${character_2}\n- ${character_3}\`\`\`**`});
                        }
                    })  
                }
            })
        }
    }
}