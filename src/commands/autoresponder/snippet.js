import Discord from "discord.js";
import knexjs from "knex";

const knex = knexjs({
  client: "sqlite3",
  connection: {
    filename: "db.sqlite",
  },
  useNullAsDefault: true,
});

const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * @param {Discord.Client} client
 */
export const init = async (client) => {
  console.log("CMD: Loaded auto/explain");
  if (!(await knex.schema.hasTable("s"))) {
    await knex.schema.createTable("s", (t) => {
      t.increments("id");
      t.string("name");
      t.string("desc");
      t.string("guildid");
    });
  }

  client.on("message", async (message) => {
    if (
      message.content.startsWith(".s") ||
      message.content.startsWith(".snippet")
    ) {
      const command = message.content
        .replace(".s ", "")
        .replace(".snippet ", "");
      if (command.startsWith("create")) {
        const name = command.replace("create ", "").split(" ")[0];
        let description = command.replace("create ", "").replace(name, "");
        await knex("s")
          .where({ name: name, guildid: message.guild.id })
          .delete();
        await knex("s").insert({
          name,
          desc: description,
          guildid: message.guild.id,
        });
        await wait(100);
        message.channel.send(`Name: ${name}\nDesc: ${description}\ndone`);
      } else {
        const [s] = await knex("s")
          .where({ name: command, guildid: message.guild.id })
          .select();
        if (!s) return message.channel.send("No such thing");
        const embed = new Discord.RichEmbed()
          .setTitle("Snippet: " + s.name)
          .setDescription(s.desc.replace("%n%", "\n"))
          .setColor("GREEN")
          .setFooter("Disclaimer: User-Generated content");
        await wait(100);
        message.channel.send(embed);
      }
    }
  });
};
