require("dotenv").config();

const { Client } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const axios = require("axios");

// SETTING UP CLIENT
client.on("ready", () => {
  console.log(`${client.user.username} has started`);
});

const fiveStars = [
  "Diluc",
  "Jean",
  "Tartaglia",
  "Qiqi",
  "Zhongli",
  "Raiden",
  "Mona",
];

const fourStars = [
  "Barbara",
  "Sucrose",
  "Bennett",
  "Razor",
  "Lisa",
  "Kaeya",
  "Xingqiu",
];

let gif = "";
const getCharGif = async (charName) => {
  let result = await axios({
    method: "GET",
    url: `https://g.tenor.com/v1/search?q=${charName}%genshin%impact&key=${process.env.TENOR_TOKEN}`,
  });
  if (result) {
    let random = Math.floor(Math.random() * 10);
    gif = result.data.results[random].itemurl;
  }
};

let characterGet = "";
let rarity = 0;

async function getCharacters() {
  let result = await axios({
    method: "get",
    url: "https://api.genshin.dev/characters/",
  });
  if (result) {
    let json = result.data;
    let number = Math.floor(Math.random() * json.length);
    characterGet = json[number];
    console.log(characterGet);
  }
}

async function getCharacterDetail() {
  let result = await axios({
    method: "get",
    url: `https://api.genshin.dev/characters/${characterGet}`,
  });
  if (result) {
    rarity = result.data.rarity;
  }
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  } else {
    if (message.content.startsWith("!")) {
      const command = message.content.substring(1);
      if (command === "test") {
        message.reply("test function oi");
      }

      if (command.toLowerCase() === "gacha") {
        await getCharacters();
        await getCharacterDetail();
        if (rarity === 4) {
          await message.channel.send(
            "https://tenor.com/view/genshin-impact-gacha-gif-20798126"
          );
          await getCharGif(characterGet);
          function timeout(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
          }
          async function sleep(fn, ...args) {
            await timeout(4050);
            await message.channel.send(gif);
            await timeout(500);
            await message.channel.send(
              `Hi ${message.author}! You got ${characterGet}`
            );
          }
          sleep();
        } else if (rarity === 5) {
          await message.channel.send(
            "https://tenor.com/view/genshin-wish-5star-gif-19762608"
          );
          if (characterGet === "aloy") {
            gif =
              "https://tenor.com/view/aloy-genshin-aloy-genshin-impact-aloy-pigeons-genshin-genshin-impact-gif-23266417";
          } else {
            await getCharGif(characterGet);
          }
          function timeout(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
          }
          async function sleep(fn, ...args) {
            await timeout(4050);
            await message.channel.send(gif);
            await timeout(500);
            await message.channel.send(
              `Hi ${message.author}! You got ${characterGet}`
            );
          }
          sleep();
        }

        console.log(characterGet, rarity);
      }

      //   if (command === "gacha") {
      //     let dice = Math.floor(Math.random() * 90);
      //     if (dice === 90) {
      //       await message.channel.send(
      //         "https://tenor.com/view/genshin-wish-5star-gif-19762608"
      //       );
      //       await message.channel.send(
      //         `${fiveStars[Math.round(Math.random() * fiveStars.length)]}`
      //       );
      //     } else {
      //       const char = fourStars[Math.round(Math.random() * fourStars.length)];

      //       await message.channel.send(
      //         "https://tenor.com/view/genshin-impact-gacha-gif-20798126"
      //       );
      //       await getCharacters();
      //       await getCharacterDetail();
      //       await getCharGif(char);
      //       function timeout(ms) {
      //         return new Promise((resolve) => setTimeout(resolve, ms));
      //       }
      //       async function sleep(fn, ...args) {
      //         await timeout(4050);
      //         await message.channel.send(gif);
      //         await timeout(500);
      //         await message.channel.send(`Hi ${message.author}! You got ${char}`);
      //       }
      //       timeout();
      //       sleep();
      //     }
      //   }
    }
  }
});

// LOGIN WITH YOUR DISCORD TOKEN//
client.login(process.env.TOKEN);
