const client = require('..');
const bcrypt = require('bcrypt');
const e_success = process.env['e_success'];
const e_error = process.env['e_error'];
const db = require('quick.db')
const color = process.env.color;

const { 
    Modal, MessageAttachment, MessageEmbed, MessageSelectMenu, AttachmentBuilder,
    TextInputComponent, ShowModal, Discord,  MessageActionRow, SelectMenuBuilder, MessageButton, Interaction
} = require("discord.js");

const {
	createConnection
} = require("mysql");

const { user } = require('..');
const { ModalActionRow } = require('discord-modals');
const sql = createConnection({
	host: `localhost`,
	user: `root`,
	password: ``,
	database: `luxrp`
});

client.on('interactionCreate', async buttonInteraction =>{
    if(!buttonInteraction.isButton) return;
    if(buttonInteraction.customId === 'dnd') {
        const modal = new Modal()
            .setTitle('Character Story')
            .setCustomId('dndmod');

        const reason = new TextInputComponent()
        .setPlaceholder('Input a Reason...')
        .setLabel('Reason For Danied')
        .setStyle('PARAGRAPH')
        .setCustomId('reason')
        .setMaxLength('64')
        .setMinLength('4');

        const res = new MessageActionRow().addComponents(reason);
        modal.addComponents(res)

        await buttonInteraction.showModal(modal);
    }
    if(buttonInteraction.customId === 'acc') {
        const modal = new Modal()
            .setTitle('Character Story')
            .setCustomId('accmod');

        const reason = new TextInputComponent()
        .setPlaceholder('Input a Reason...')
        .setLabel('Reason For Accepted')
        .setStyle('PARAGRAPH')
        .setCustomId('reason')
        .setMaxLength('64')
        .setMinLength('4');

        const res = new MessageActionRow().addComponents(reason);
        modal.addComponents(res)

        await buttonInteraction.showModal(modal);
    }
    if(buttonInteraction.customId === 'cs') {
        sql.query(`SELECT * FROM players WHERE ucp = '${buttonInteraction.member.displayName}'`, function (err, result) {
            if(!result) return buttonInteraction.reply({ content: 'Your Characters Is Not Found!', ephemeral: true})
            else  {
                if(result[2]) {
                    
                const char1 = `${result[0].username}`;
                const ac1 = `${result[0].reg_id}`;
                const lev1 = `${result[0].level}`;
                
                const char2 = `${result[1].username}`;
                const ac2 = `${result[1].reg_id}`;
                const lev2 = `${result[1].level}`;  

                const char3 = `${result[2].username}`;
                const ac3 = `${result[2].reg_id}`;
                const lev3 = `${result[2].level}`;
                const menu = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('charsel')
                    .setPlaceholder('Select Character.')
                    .addOptions([{
                            label: `${char1}`,
                            description: `Account ID: ${ac1} - Level: ${lev1}`,
                            value: `${char1}`
                        },{
                            label: `${char2}`,
                            description: `Account ID: ${ac2} - Level: ${lev2}`,
                            value: `${char2}`
                        },{
                            label: `${char3}`,
                            description: `Account ID: ${ac3} - Level: ${lev3}`,
                            value: `${char3}`
                        }
                    ])
                );

                buttonInteraction.reply({ content: `Select Characters Below!`, components: [menu], ephemeral: true})
                } else if(result[1]) {
                    
                const char1 = `${result[0].username}`;
                const ac1 = `${result[0].reg_id}`;
                const lev1 = `${result[0].level}`;
                
                const char2 = `${result[1].username}`;
                const ac2 = `${result[1].reg_id}`;
                const lev2 = `${result[1].level}`;  
                    
                const menu = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('charsel')
                    .setPlaceholder('Select Character.')
                    .addOptions([{
                            label: `${char1}`,
                            description: `Account ID: ${ac1} - Level: ${lev1}`,
                            value: char1,
                        },{
                            label: `${char2}`,
                            description: `Account ID: ${ac2} - Level: ${lev2}`,
                            value: char2,
                        }
                        
                    ])
                );

                buttonInteraction.reply({ content: `Select Characters Below!`, components: [menu], ephemeral: true})
                } else if(result[0]) {
                    
                const char1 = `${result[0].username}`;
                const ac1 = `${result[0].reg_id}`;
                const lev1 = `${result[0].level}`;
                const menu = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('charsel')
                    .setPlaceholder('Select Character.')
                    .addOptions([{
                            label: `${char1}`,
                            description: `Account ID: ${ac1} - Level: ${lev1}`,
                            value: `${char1}`
                        }
                        
                    ])
                );

                buttonInteraction.reply({ content: `Select Characters Below!`, components: [menu], ephemeral: true})
                }
            }
        })
    }
    
});
client.on("interactionCreate", async Interaction => {
    if(!Interaction.isSelectMenu) return;
    if(Interaction.customId === 'charsel') {
        db.set(`char-${Interaction.member.id}`, Interaction.values);
        const modal = new Modal()
           .setCustomId('csmod')
           .setTitle(`Character: ${Interaction.values}`);

       const link = new TextInputComponent()
           .setCustomId('link')
           .setPlaceholder("https://pastebin.com/......")
           .setLabel("Pastebin Link")
           .setMinLength('10')
           .setMaxLength('64')
           .setStyle('PARAGRAPH');
        
        const Note = new TextInputComponent()
           .setCustomId('Note')
           .setPlaceholder("Note...")
           .setLabel("Note (Optional)")
           .setRequired(false)
           .setStyle('SHORT');

       const firstActionRow = new MessageActionRow().addComponents(Note);
       const secondActionRow = new MessageActionRow().addComponents(link);
      // const thirdActionRow = new MessageActionRow().addComponents(mailInput);
       modal.addComponents(secondActionRow, firstActionRow);
       await Interaction.showModal(modal);
    }
})
client.on("interactionCreate", async modalInteraction =>{
    if(!modalInteraction.isModalSubmit) return;
    if(modalInteraction.customId === 'dndmod') {
        const reason = modalInteraction.fields.getTextInputValue('reason')
        const data = db.fetch(`csdata-${modalInteraction.message.id}`);

        const emd = new MessageEmbed()
        .setColor(color)
        .setTitle('📋 Character Story')
        .setDescription(`Hallo <@${data.did}>, Thanks For Waiting\nYour Character Story Request Has Been **Denied**<:failed:${e_error}>!\n\n**Information:**\n**Character:** ${data.name}\n**Story Link:** ${data.link}\n**Danied By:** ${modalInteraction.member.displayName}\n**Reason:** ${reason}`)
        .setFooter({ text: `Danieded`})
        .setTimestamp();

        sql.query(`UPDATE players SET characterstory='0' WHERE username='${data.name}'`, function (err, succ) {
            if(err) return console.log(err)
            if(succ) return console.log(succ)
        })

        modalInteraction.reply({ content: `<:yeas:${e_success}> Your Successfully Denieded Character Story **${data.name}**!`, ephemeral: true})
        db.delete(`csdata-${modalInteraction.message.id}`);
        modalInteraction.message.delete();
        client.users.cache.get(data.did).send({ embeds: [ emd ]});
    }
    if(modalInteraction.customId === 'accmod') {
        const reason = modalInteraction.fields.getTextInputValue('reason')
        const data = db.fetch(`csdata-${modalInteraction.message.id}`);

        const emd = new MessageEmbed()
        .setColor(color)
        .setTitle('📋 Character Story')
        .setDescription(`Hallo <@${data.did}>, Thanks For Waiting\nYour Character Story Request Has Been **Accepted**<:yeas:${e_success}>!\n\n**Information:**\n**Character:** ${data.name}\n**Story Link:** ${data.link}\n**Accepted By:** ${modalInteraction.member.displayName}\n**Reason:** ${reason}`)
        .setFooter({ text: `Accepted`})
        .setTimestamp();

        sql.query(`UPDATE players SET characterstory='1' WHERE username='${data.name}'`, function (err, succ) {
            if(err) return console.log(err)
            if(succ) return console.log(succ)
        })

        modalInteraction.reply({ content: `<:yeas:${e_success}> Your Successfully Accepted Character Story **${data.name}**!`, ephemeral: true})
        db.delete(`csdata-${modalInteraction.message.id}`);
        modalInteraction.message.delete();
        client.users.cache.get(data.did).send({ embeds: [ emd ]});
    }
    if(modalInteraction.customId === 'csmod') {
        const char = db.fetch (`char-${modalInteraction.member.id}`)
        const link = modalInteraction.fields.getTextInputValue('link');
        const note = modalInteraction.fields.getTextInputValue('Note');

        const emd = new MessageEmbed()
           .setColor(0x0077dd)
           .setTitle('📋 Character Story')
           .setDescription(`**Character:** ${char}\n**Link**: ${link}\n**Note:** ${note}\n\n**Staff**:\n[+] Gunakan Button Accept Untuk Menerima Cs\n[+] Gunakan Button Denied Untuk Menolak Cs!`)
           .setFooter(`Request By: ${modalInteraction.member.displayName}#${modalInteraction.user.discriminator}`);
        const ace = new MessageButton() 
        .setStyle('SUCCESS')
        .setCustomId('acc')
        .setLabel('✅ Accept');
        const dnd = new MessageButton() 
        .setStyle('DANGER')
        .setCustomId('dnd')
        .setLabel('✖ Danied');
        const linnk = new MessageButton() 
        .setStyle('LINK')
        .setURL(`${link}`)
        .setLabel('Link');

        modalInteraction.reply({ content: `<:yeas:${e_success}> Your Successfully Submit Character Story Form's!`, ephemeral: true})
        const button = new MessageActionRow().addComponents(ace, dnd, linnk);
        client.channels.cache.get('1039255471539900456').send({ embeds: [emd], components:[button]})
        db.set(`empcs`, {
            name: char,
            link: link,
            did: modalInteraction.member.id,
        })
    }
   
})

client.on("messageCreate", async (msg) => {
 //   if(!msg.channel.id === '1039255471539900456') return;
    if(msg.channel.id === '1039255471539900456'){
        const data = db.fetch(`empcs`);

    db.set(`csdata-${msg.id}`,{
        name: data.name,
        link: data.link,
        did: data.did
    })
    
    console.log(` Msg Id ${msg.id}`)
    }
    
})

