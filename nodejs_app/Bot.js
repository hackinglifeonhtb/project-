require('dotenv').config();

// Discord.js versions ^13.0 require us to explicitly define client intents
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
})

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
});
function create_post_as_ticket(channel_id, ticket_id, ticket_question, ticket_title) {
    const channel = client.channels.cache.get(channel_id);
    channel.threads.create({ name: `Ticket Title: ${ticket_title}, Ticket ID: ${ticket_id}`, message: { content: ticket_question } });
}
function send_comment(comment, channel_id, ticket_id, ticket_title) {
    const channel = client.channels.cache.get(channel_id);
    const thread = channel.threads.cache.find(x => x.name === `Ticket Title: ${ticket_title}, Ticket ID: ${ticket_id}`);
    console.log(ticket_title)
    thread.send(comment)
    /*client.on('message', (msg) => {
        msg.channel.send(message)
        console.log(msg, message);
    });*/
}

// Log In our bot
client.login("MTE2ODU1NjM1MjY1NDgyMzQ3NQ.GEySHh.7M7-G1ijLivG3SQM3A0VZgj_rGyMvtoee0wZD0");

module.exports = { create_post_as_ticket, send_comment };