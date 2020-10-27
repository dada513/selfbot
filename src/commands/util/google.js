import Discord from "discord.js";
import serp from "serp";

const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * @param {Discord.Client} client
 */
export const init = (client) => {
  console.log("CMD: Loaded google");
  client.on("message", async (message) => {
    if (message.content.startsWith(".google")) {
      await wait(100);
      const msg = await message.channel.send("Loading search results...");
      const query = message.content.replace(".google ", "");
      const result = await serp.search({
        host: "google.com",
        qs: {
          q: query,
        },
      });
      const embed = new Discord.RichEmbed();
      embed.setAuthor("Google Search", "https://i.imgur.com/dcJhYDu.png");
      embed.setColor("ORANGE");
      result.forEach((result) => embed.addField(result.title, result.url));
      msg.edit("", embed);
    }
  });
};
