const Telegraf = require("telegraf").Telegraf;
const TOKEN = "5767772684:AAFIrs0zyy4klNzIEsu2kC40BA7nOkxIV_4";
const Bot = new Telegraf(TOKEN);

let category = 0;
let salary = 0;
let sum = 0;
let age = 0;
let task = 1;

function countSalary(cat, sal) {
  let answer = 0;
  if (cat == 1) {
    answer = sal * 1.5 + 50;
  } else if (cat == 2) {
    answer = sal * 1.3 + 60;
  } else if (cat == 3) {
    answer = sal * 1.4 + 70;
  }
  return answer;
}

function countPrice(sum, age) {
  if (age <= 6) {
    sum = sum * 0.95;
  } else if (age >= 65) {
    sum = sum * 0.9;
  }
  return sum;
}

Bot.start((ctx) => {
  ctx.reply(
    "1) На підприємстві виплачують премію" +
      "працівникам в залежності від їх" +
      "категорії К:" +
      "- 1 категорія - 50% від окладу +50грн;" +
      "- 2 категорія - 30% від окладу +60грн;" +
      "- 3 категорія - 40% від окладу +70грн." +
      "Значення категорії К та оклада О" +
      "працівників вводиться з клавіатури\n" +
      "\n2) В аптеці для дітей віком до 6 років діє" +
      "знижка 5%, для пенсіонерів – 10%." +
      "Скільки повинен заплатити клієнт," +
      "якщо він придбав товару на М грн," +
      "йому К років і пенсійний вік для нього" +
      "становить – 65 років. Значення М, К" +
      "вводяться з клавіатури"
  );
  /* ctx.reply("Input category"); */
  ctx.replyWithHTML("Choise of task", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Task No 1", callback_data: "task1" }],
        [{ text: "Task No 2", callback_data: "task2" }],
      ],
    },
  });
});

Bot.action("task1", (ctx) => {
  task = 1;
  ctx.reply("Input category");
  category = 0;
  salary = 0;
});

Bot.action("task2", (ctx) => {
  task = 2;
  ctx.reply("Input sum");
  age = 0;
  sum = 0;
});

Bot.hears(/[A-Я]+/i, (ctx) => {
  ctx.reply("Input number");
});

/* Bot.hears(["1", "2", "3"], (ctx) => {
  category = ctx.message.text;
  ctx.reply("Input Salary");
}); */

Bot.hears(/[0-9]+/, (ctx) => {
  if (task == 1) {
    if (category == 0) {
      if ([1, 2, 3].includes(+ctx.message.text)) {
        category = ctx.message.text;
        ctx.reply("Input salary");
      } else {
        ctx.reply("Input correct number");
        return;
      }
    } else {
      salary = ctx.message.text;
      ctx.reply(
        "Your salary with bonuses is: " + countSalary(category, salary)
      );
    }
  } else if (task == 2) {
    if (sum == 0) {
      sum = ctx.message.text;
      ctx.reply("Input age");
    } else {
      age = ctx.message.text;
      ctx.reply("Your payment: " + countPrice(sum, age));
    }
  }
});

Bot.launch();
