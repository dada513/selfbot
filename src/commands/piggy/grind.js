import Discord from "discord.js";

const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * @param {Discord.Client} client
 */
export const init = (client) => {
  console.log("CMD: Loaded piggygrind");
  client.on("message", async (message) => {
    if (message.content.startsWith(".pgrind")) {
      await wait(500);
      await message.channel.send("[bot] starting grind bot... v1.0.0");
      const grind = async () => {
        await message.channel.send("%battle");
        const listener = async (msg) => {
          if (
            msg.author.id == "681770687614156811" &&
            msg.embeds[0] &&
            msg.embeds[0].title
          ) {
            if (msg.embeds[0].title.includes("Battle Results")) {
              client.removeListener("message", listener);
              await wait(500);
              message.channel.send("Battle ended: setting timer to 30 sec");
              setTimeout(() => {
                grind();
              }, 40 * 1000);
            }
          }
        };
        client.on("message", listener);
      };
      grind();
    }
  });
};
