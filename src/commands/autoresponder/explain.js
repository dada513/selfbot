import Discord from "discord.js";

const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * @param {Discord.Client} client
 */
export const init = (client) => {
  console.log("CMD: Loaded auto/explain");
  client.on("message", async (message) => {
    if (message.content.startsWith(".explain")) {
      const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTitle("Please explain your question")
        .setDescription(
          [
            "1. What is the problem? What are you trying to achieve?",
            "2. What is your current code? If it's long, post it to [Hastebin](https://hastebin.com) or [Github Gist](https://gist.github.com).",
          ].join("\n\n")
        )
        .addField(
          "See also",
          "[How to ask](https://stackoverflow.com/help/how-to-ask), [Don't ask to ask](https://dontasktoask.com)"
        )
        .setFooter(
          "Beep, boop. I am a bot and a human. Block me if don't like this utility"
        )
        .setColor("RED");

      await wait(100);
      await message.channel.send(embed);
    }
  });
};
