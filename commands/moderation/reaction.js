const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'reaction',
    description: "Sets up a reaction role message!",

    run: async(client, message, args) => {
        const channel = '1027132436485787648';
        const yellowTeamRole = message.guild.roles.cache.find(role => role.id === "1027000051941249024")
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply('**you not acces!**')

        const Emoji = '🔰';

        let embed = new MessageEmbed()
            .setColor('#e42643')
            .setTitle('Register Role')
            .setURL("https://discord.gg/QauSGjcSRd")
            .setDescription(`**klik ${Emoji} untuk mendapatkan akses**`)
 
 
        let messageEmbed = await await message.channel.send({ embeds: [embed]})
        messageEmbed.react(Emoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === Emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(yellowTeamRole);
                }
                
            } 
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === Emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowTeamRole);
                }
                
            } 
        });
    }
 
}   