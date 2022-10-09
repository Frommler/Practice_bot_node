const Telegraf = require("telegraf").Telegraf;
const TOKEN = "5767772684:AAFIrs0zyy4klNzIEsu2kC40BA7nOkxIV_4";
const Bot = new Telegraf(TOKEN);

let category = 0;
let salary = 0;
let answer = 0;

Bot.start((ctx) => {
  ctx.reply(
    "На підприємстві виплачують премію" +
      "працівникам в залежності від їх" +
      "категорії К:" +
      "- 1 категорія - 50% від окладу +50грн;" +
      "- 2 категорія - 30% від окладу +60грн;" +
      "- 3 категорія - 40% від окладу +70грн." +
      "Значення категорії К та оклада О" +
      "працівників вводиться з клавіатури"
  );
  ctx.reply("Input category");
});

Bot.hears(/[A-Z]+/i, ctx => {
  ctx.reply("Input number");
});

Bot.hears(["1", "2", "3"], (ctx) => {
  category = ctx.message.text;
  ctx.reply("Input Salary");
});

Bot.hears(/[0-9]+/, (ctx) => {
  salary = ctx.message.text;
  if (category == 1) {
    answer = salary * 1.5 + 50;
  } else if (category == 2) {
    answer = salary * 1.3 + 60;
  } else if (category == 3) {
    answer = salary * 1.4 + 70;
  } else {
    ctx.reply("Wrong category");
    return;
  }
  ctx.reply("Your salary with bonuses is: " + answer);
});

Bot.launch();
