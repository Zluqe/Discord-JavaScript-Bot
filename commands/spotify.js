const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'spotify',
  description: 'Displays the user\'s current Spotify activity.',
  async execute(client, message, args) {
    const user = message.mentions.users.first() || message.author;

    const res = await fetch(`https://api.spotify.com/v1/users/${user.id}/currently-playing`, {
      headers: {
        'Authorization': `Bearer ${user.presence.activities[0].state}`
      }
    });

    if (res.status === 204 || res.status > 400) {
      return message.channel.send(`${user.username} is not listening to anything on Spotify.`);
    }

    const data = await res.json();
    const track = data.item;

    const spotifyEmbed = new MessageEmbed()
      .setColor('#00ff00')
      .setTitle(`${user.username}'s spotify`)
      .setDescription(`[${track.name}](${track.external_urls.spotify})`)
      .addFields(
        { name: 'Artist', value: track.artists.map(artist => artist.name).join(', '), inline: true },
        { name: 'Album', value: track.album.name, inline: true },
        { name: 'Duration', value: formatDuration(track.duration_ms), inline: true }
      )
      .setThumbnail(track.album.images[0].url);

    return message.channel.send({ embeds: [spotifyEmbed] });
  }
};

function formatDuration(durationMs) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = ((durationMs % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
