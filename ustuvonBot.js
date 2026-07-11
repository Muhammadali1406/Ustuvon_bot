require("dotenv").config();

const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

const users = {};

bot.start((ctx) => {
    const userId = ctx.from.id;
    users[userId] = { step: 1, data: {} };
    ctx.reply("🖐️ Assalomu Alaykum!\n\nAgar testga tayyor bo'lsangiz, pastdagi tugmani bosing:");
    ctx.reply("Testni boshlash", Markup.inlineKeyboard([
        Markup.button.callback("Testni boshlash", "start_test"),
    ]));
    
    
    bot.action("start_test", (ctx) => {
        ctx.reply("📋 Test boshlanmoqda...\n\n1-savol: {}" );
        users[userId].step = 2;
    });
});

bot.launch();

console.log("🤖 Bot ishga tushdi...");