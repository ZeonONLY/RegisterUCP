const client = require('..');
const bcrypt = require('bcrypt');
const e_success = process.env['e_success'];
const config = require('../config.json')
const e_error = process.env['e_error'];

const {
    Modal,
    MessageAttachment,
    MessageEmbed,
    AttachmentBuilder,
    TextInputComponent,
    ShowModal,
    Discord,
    MessageActionRow,
    SelectMenuBuilder,
    MessageButton
} = require("discord.js");

const {
    createConnection
} = require("mysql");

const {
    user
} = require('..');
const {
    ModalActionRow
} = require('discord-modals');
const sql = createConnection({
    host: `localhost`,
    user: `root`,
    password: ``,
    database: `rurpback`
});

client.on('interactionCreate', async buttonInteraction => {
    if (!buttonInteraction.isButton) return;
    if (buttonInteraction.customId === 'register') {
        if (buttonInteraction.member.roles.cache.has('1000755753629519872')) return buttonInteraction.reply({
            content: `Your Discord Account Already Verifed!!`,
            ephemeral: true
        })
        const ms = require("ms")
        const timesSpan = ms('14 days')
        const createdAt = new Date(buttonInteraction.member.user.createdAt).getTime();
        const detectDays = Date.now() - createdAt;
        if (detectDays < timesSpan) return buttonInteraction.reply({
            content: `<:no:${e_error}>Untuk melakukan registrasi akun discord mu Harus berumur 14 hari`,
            ephemeral: true
        })

        sql.query(`SELECT * FROM playerucp WHERE DiscordID='${buttonInteraction.member.id}'`,(err, ress) => {
            console.log(`Has Runned ${ress}, ${err}`)
            if (ress.length > 0)  {
                buttonInteraction.reply({
                content: `Your Discord Account Already Registered As **${ress[0].ucp}**, Use **Reverif Button** Instead!!`,
                ephemeral: true
            })
            }
            else {
                const modal = new Modal()
                    .setCustomId('myModal')
                    .setTitle('Ravine Registration');

                const ucpNameInput = new TextInputComponent()
                    .setCustomId('ucpNameInput')
                    .setPlaceholder("Username...")
                    .setLabel("User Control Panel")
                    .setMaxLength('12')
                    .setMinLength('5')
                    .setStyle('SHORT');

                const passInput = new TextInputComponent()
                    .setCustomId('passInput')
                    .setPlaceholder('Passwords...')
                    .setLabel('Account Password')
                    .setMaxLength('24')
                    .setMinLength('5')
                    .setStyle('SHORT');


                const firstActionRow = new MessageActionRow().addComponents(ucpNameInput);
                const secondActionRow = new MessageActionRow().addComponents(passInput);
                modal.addComponents(firstActionRow);

                buttonInteraction.showModal(modal);
                console.log('iontolepler')
            }
        })
    }
    if (buttonInteraction.customId === 'verify') {

        if (buttonInteraction.member.roles.cache.has(config.roleid)) return buttonInteraction.reply({
            content: `<:no:${e_error}> Your Discord Account Already Verifed!!`,
            ephemeral: true
        })
        const file = new MessageAttachment('./Image/icon.png')

        const nixmex = new MessageActionRow();

        const libut = new MessageButton()
            .setLabel('Luxury Roleplay')
            .setStyle('LINK')
            .setURL('https://discord.gg/DzdCUxerHZ');

        nixmex.addComponents(libut);
        sql.query(`SELECT * FROM playerucp WHERE DiscordID='${buttonInteraction.member.id}'`, async (err, rows) => {
            if (err) {
                buttonInteraction.reply({
                    content: `<:no:${e_error}> Your Account is not found!`,
                    ephemeral: true
                })
            } else if (rows) {
                const username = `${rows[0].ucp}`;
                const number = `${rows[0].verifycode}`;
                //  const chnya = client.channels.cache.get('1020538967151607848');
                const embetUser = new MessageEmbed()
                    .setColor(0x008ada)
                    .setAuthor({
                        name: `Luxury Registration`,
                        iconURL: 'attachment://icon.png'
                    })
                    .setImage(`https://ptissite.sirv.com/20230319_215024.jpg?text.0.text=${username}&text.0.position.gravity=center&text.0.position.x=-23%25&text.0.position.y=13%25&text.0.size=15&text.0.color=00a0ff&text.0.font.family=Acme&text.0.font.weight=700&text.1.text=${number}&text.1.position.gravity=south&text.1.position.x=-24%25&text.1.position.y=-15%25&text.1.size=14&text.1.color=00abff&text.1.font.family=Acme&text.1.font.weight=700`)
                    .setTimestamp()
                    .setFooter({
                        text: 'Luxury© 2023'
                    })
                buttonInteraction.member.setNickname(`${username}`);
                buttonInteraction.member.roles.add(config.roleid)
                buttonInteraction.user.send({
                    embeds: [embetUser],
                    files: [file],
                    components: [nixmex]
                })
                // chnya.send({ content: `🔗 Reverifed Ucp **${ucname}** | <@${buttonInteraction.member.id}> Selected Ucp account from \`Ravine Database\``})
                buttonInteraction.reply({
                    content: `<:yeas:${e_success}> You've Succesfully Reverifed to ucp **${username}**, Please Check Your Direct Message!!`,
                    ephemeral: true
                })
            }

        }) //galat

    }
});


client.on('ready', () => {
    sql.query(`SELECT * FROM farm`, async (err, ress) => {
        if (ress) {
            console.log(`Ressnya ${ress}`)
        } else if (err) {
            console.log(`error tcuy ${err}`)
        }
    })
})



client.on("interactionCreate", async modalInteraction => {
    if (!modalInteraction.isModalSubmit) return;
    if (modalInteraction.customId === "myModal") {
        const username = modalInteraction.fields.getTextInputValue('ucpNameInput');
        const number = ("0" + (Math.floor(Math.random() * (1111 - 99999 + 1)) + 1111)).substr(-4);
        if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(username)) return modalInteraction.reply({
            content: `<:no:${e_error}> Don't Use Special Character for your ucp name!`,
            ephemeral: true
        })

        sql.query(`SELECT * FROM playerucp WHERE ucp = '${username}'`, (err, ress) => {
            if (ress.length > 0) {
                modalInteraction.reply({
                    content: `<:no:${e_error}> Username **${username}** Already exists on database, use another name!`,
                    ephemeral: true
                })
            } else {
                const file = new MessageAttachment(`./image/icon.png`);
                const embetUser = new MessageEmbed()
                    .setColor(0x008ada)
                    .setAuthor({
                        name: `Luxury Registration`,
                        iconURL: 'attachment://icon.png'
                    })
                    .setImage(`https://ptissite.sirv.com/20230319_215024.jpg?text.0.text=${username}&text.0.position.gravity=center&text.0.position.x=-23%25&text.0.position.y=13%25&text.0.size=15&text.0.color=00a0ff&text.0.font.family=Acme&text.0.font.weight=700&text.1.text=${number}&text.1.position.gravity=south&text.1.position.x=-24%25&text.1.position.y=-15%25&text.1.size=14&text.1.color=00abff&text.1.font.family=Acme&text.1.font.weight=700`)
                    .setTimestamp()
                    .setFooter({
                        text: 'Luxury© 2023'
                    })

                const libut = new MessageButton()
                    .setLabel('Luxury Roleplay')
                    .setStyle('LINK')
                    .setURL('https://discord.gg/DzdCUxerHZ');

                const nixmex = new MessageActionRow().addComponents(libut);

                sql.query(`INSERT INTO playerucp (ucp, verifycode, DiscordID) VALUES ('${username}', '${number}', '${modalInteraction.member.id}')`, (err, samp) => {
                    if (err) throw err;
                    if (samp && samp.affectedRows == 0) {
                        return modalInteraction.reply({
                            content: `<:no:${e_error}> Your discord account already have ucp, Use **Reverif Button** instead!`,
                            ephemeral: true
                        })

                    } else {
                        //const chnya = client.channels.cache.get('1020538967151607848');
                        modalInteraction.member.setNickname(`${username}`);
                        modalInteraction.member.roles.add(config.roleid)
                        //  modalInteraction.member.roles.remove(" 1001846144546132028")
                        modalInteraction.user.send({
                            embeds: [embetUser],
                            files: [file],
                            components: [nixmex]
                        })
                        //chnya.send({ content: `<:webhost:1033688284334936174> Ucp **${username}** | <@${modalInteraction.member.id}> Registered And Saved To \`Ravine Database\``})
                        modalInteraction.reply({
                            content: `<:yeas:${e_success}> **${username}** Succesfully Registered Please Check Your Direct Message!!`,
                            ephemeral: true
                        })
                    }
                })
            }
        })

    }
})