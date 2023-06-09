const { SlashCommandBuilder, EmbedBuilder } = require ('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName('automod-flagged-words')
        .setDescription('Creates an automod rule for flagged words'),


async execute (interaction , client) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && !interaction.member.roles.cache.some((r) => r.name === "Deletes")) { return interaction.reply({ content: "Seems like you don't have `manage_messages` intents or a role named `Deletes", ephemeral: true }) }
const {  guild} = interaction ;
        const rule = await guild.autoModerationRules.create(
            {
                name: `Prevent profanity and sexual content, slurs by ${client.user.username}`,
                creatorId: `487229623810129922`,
                enabled: true,
                eventType: 1,
                triggerType: 4,
                triggerMetadata:
                {
                   presets : [1 , 2 , 3]
                },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: `This message was prevented by ${client.user.username} moderation`
                        }
                    }
                ]

            }).catch(async err => {
console.log(err)
            })

        const embed = new EmbedBuilder()
        .setAuthor({name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL()})
        .setDescription(`**Your automod rule for \`Flagged Words\` has been created successfully**`)
        .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
        .setColor(0x00FF00)
        .setFooter({text: `Created by: ${interaction.user.id}`, iconURL: interaction.user.avatarURL()})
        .setTimestamp();

            if (!rule) return;
await interaction.deferReply({fetchReply : true})
          return  await interaction.editReply({ embeds: [embed] })
 
    }


}
