const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Show the help page.',
    run: async(client, message, args) => {
      let embed = new MessageEmbed()
      .setTitle(`${client.user.username}'s Help Page`)
      .setDescription(`This help page shows all the command of this bot.\n\n**Commands**\n\`help\`\nShow the help page.\n\n\`ping\`\nReturns bot ping.\n\n\n**Slash Commands**\n\`ping\`\nReturns bot ping.\n\n\`parent-category\`\nSet the parent category of ticket channels\n\n\`send-channel\`\nSet the channel to send the ticket panel\n\n\`transcript-set\`\nSet the channel to send transcript & the type of transcrip\n\n\`send-panel\`\nSend the ticket panel.\n\n\`create\`\nCreate a new the ticket\n\n\`close\`\nClose the ticket.\n\n\`open\`\nOpen the ticket.\n\n\`delete\`\nDelete the ticket.\n\n\`transcript\`\nSend the ticket transcript. `)
      .setFooter(`suport anaxy via sawaria`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
      message.channel.send({ embeds: [embed] });

    }
    
}