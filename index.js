const fs = require('fs');
const token = null; // PUT TOKEN HERE.
const channelName = null; // PUT CHANNEL NAME HERE

const Discord = require('discord.js');
const client = new Discord.Client();
general = null;
generalUsers = null;

function checkUsers(){
	console.log('Checking users.');

	oldUsers = generalUsers;
	currentUsers = general.members.array();
	newUsers = new Array();
	
 	for (user of currentUsers){
		if(oldUsers.indexOf(user) == -1){
			newUsers.push(user);
		}
	}	

	if(newUsers.length > 0){
		defaultChannel = client.guilds.first().defaultChannel;
	
		msg = 'New users in general channel:\n';
		for (user of newUsers){
			msg+= user.displayName +'\n';
		}
		defaultChannel.sendMessage(msg);
	}
	generalUsers = currentUsers;
	setTimeout(checkUsers, 3000);
}


client.on('ready', () => {
	console.log('Logged in.');

	server = client.guilds.first();
	channels = server.channels.array();
	for (c of channels){
		if(c.name === channelName){
			general = c;
			generalUsers = c.members.array();
		}
	}
	console.log('General channel selected');
	checkUsers();
});

client.on('message', message => {
	if (message.content === '!sinkerTest'){
		message.reply('Connected and listening!');
	}
	else if (message.content === '!users'){
		response = "The users on this server are: \n";
		server = client.guilds.first();
		members = server.members.array()
		for (gMember of members){
			response+= gMember.displayName + " who is " + gMember.presence.status + "\n"
		}	
		message.reply(response);
	}
});

client.login(token);
