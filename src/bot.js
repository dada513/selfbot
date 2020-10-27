import Discord from "discord.js";
import dotenv from "dotenv";

// COMMANDS
import * as piggyGrindCommand from "./commands/piggy/grind";
import * as googleCommand from "./commands/util/google";
import * as explainCommand from "./commands/autoresponder/explain";
import * as snippets from "./commands/autoresponder/snippet";

dotenv.config();
const client = new Discord.Client();

client.once("ready", () => {
  console.log("pogger");
  piggyGrindCommand.init(client);
  googleCommand.init(client);
  explainCommand.init(client);
  snippets.init(client);
});

client.login(process.env.TOKEN);
process.on("unhandledRejection", (r) => {
  console.log("UNH:", r);
});
