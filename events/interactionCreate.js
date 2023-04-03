const client = require('..');

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return; 
    const slashCommand = client.slashCommands.get(interaction.commandName); 
    if(!slashCommand) return 
    try{
        await slashCommand.execute(client, interaction) 
    } catch (err) {
        if (err) console.error(err);
        await interaction.reply({ content: 'There was an error!', ephemeral: true })
    }
});

