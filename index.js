const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js')



client.on("ready", () =>{
    console.log(`Ready! Logged in as GeoFS Wiki Bot V.A.0.7.0, System Complete.`);  //Release Version
    client.user.setActivity("the GeoFS Wiki. !commands");  //Custom Status
 });

 client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'test');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
  });

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
   
	if (command === 'help') { //Command 1
        message.channel.send('Commands: *server*, *user-info*, *prune [number]*, *raid [user]*, *wiki*, *ban [user]*, *kick [user]*. ');
  } 
  
    else if (command === 'server') {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`); //Command 3
    } 
    
    
    else if (command === 'user-info') {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`); //Command 4
    } 
    
    
    else if (command === 'info') { //Command 5
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        } 
        else if (args[0] === 'test') {
			return message.channel.send('You found the word!');
		}
        message.channel.send(`Your first word: ${args[0]}`);
        

  
  
      } else if (command === 'raid') { //Command 5.1
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to raid them!');
		}

		const taggedUser = message.mentions.users.first();

        message.channel.send(`Here's your raid, ${taggedUser}`);
        message.channel.send(` ${taggedUser}`);
        message.channel.send(` ${taggedUser}`);
        message.channel.send(` ${taggedUser}`);
        message.channel.send(` ${taggedUser}`);
    
    
    } else if (command === 'avatar') { //Command 6
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
		}

		

		
	} else if (command === 'prune') { //Command 7
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
    }
    
    if (!message.guild) return;

    // If the message content starts with "!kick"
    else if (command === 'kick') {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.members.resolve(user);
        // If the member is in the guild
        if (member) {
          /**
           * Kick the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           */
          member
            .kick('On behalf of a human administrator.')
            .then(() => {
              // We let the message author know we were able to kick the person
              message.reply(`Successfully kicked ${user.tag}`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to kick the member,
              // either due to missing permissions or role hierarchy
              message.reply('I was unable to kick the member');
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply("That user isn't in this guild!");
        }
        // Otherwise, if no user was mentioned
      } else {
        message.reply("You didn't mention the user to kick!");
      }
    }

     // if the message content starts with "!ban"
   else if (command === 'ban') {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.members.resolve(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: 'On behalf of a human administrator.',
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to ban the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      message.reply("You didn't mention the user to ban!");
    }
  }

 

  else if (command === 'wiki'){
    message.channel.send({embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL()
      },
      title: "The GeoFS Community Wiki",
      url: "http://geofs.fandom.com",
      description: "The GeoFS Wiki is an open-sourced, free-to-edit cyclopedia for the GeoFS Community.",
      fields: [{
          name: "Forum",
          value: "https://geofs.fandom.com/f"
        },
        {
          name: "Editor's pick:",
          value: "https://geofs.fandom.com/wiki/aircraft"
        },
        {
          name: "YouTube Channel:",
          value: "https://www.youtube.com/channel/UCtT3dKTUdjT0gwz7FIP9C4w"
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL(),
        text: "©GeoFlyDɾҽαɱ#4830"
      }
    }


    
  });
  }

  else if (command === 'tundraangry'){
    message.channel.send("https://cdn.discordapp.com/attachments/716669712968450080/758823683799777300/unknown.png")
  }
  else if (command === 'tundramurder'){
    message.channel.send("https://cdn.discordapp.com/attachments/716669712968450080/759173412219650108/unknown.png")
  }
  else if (command === 'immortallac'){
    message.channel.send("https://cdn.discordapp.com/attachments/750376359527710791/781153166192148480/unknown.png")
  }
  else if (command === 'commands'){
    message.channel.send({embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL()
      },
      title: "My commands <3",
      url: "http://invite.gg/geofs",
      description: "I am GeoKi, a Discord Bot created using Discord.js. I'm here to help GeoFS Communities.",
      fields: [{
          name: "Server Info",
          value: "!server **Permission Required:** None"
        },
        {
          name: "User Info",
          value: "!user-info **Permission Required:** None"
        },
        {
          name: "Prune (Bulk delte messages)",
          value: "!prune [number] **Permission Required:** Manage messages"
        },
        {
          name: "GeoFS Wiki and important stuff",
          value: "!wiki **Permission Required:** None"
        },
        {
          name: "Raid (Ping hehe)",
          value: "!raid [member] **Permission Required:** None"
        },
        {
          name: "Kick User",
          value: "!kick [member] **Permission Required:** Kick/Ban Users"
        },
        {
          name: "Ban User",
          value: "!ban [member] **Permission Required:** Kick/Ban Users"
        },
        {
          name: "Angry Tundra... rip",
          value: "!tundraangry **Permission Required:** None"
        },
        {
          name: "Tundra's gonna murder me",
          value: "!tundramurder **Permission Required:** None"
        },
        {
          name: "LAC is immortal..",
          value: "!immortallac **Permission Required:** None"
        },
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL(),
        text: "©GeoFlyDɾҽαɱ#4830"
      }
    }


    
  });
  }


  client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
  });
  
});

client.login('');
