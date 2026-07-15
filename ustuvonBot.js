require("dotenv").config();

const { Telegraf } = require("telegraf");
const projects = require("./projects");

const bot = new Telegraf(process.env.BOT_TOKEN);


// Nomzodlar

const users = [
    //{ id: 8251893506, name: "Janob boshbori", profession: "fullstack", type: "online" },
    //{id: 6466116037,name: "Dilshod Mahmudov",profession: "fullstack",type: "online"},
    //{id: 6690920445,name: "Muhammadjon Mashrabov",profession: "frontend",type: "online"},
    //{id: 5817905119,name: "Samandar Qodirov",profession: "frontend",type: "online"},
    //{ id: 8393769853, name: "Boboxonov Javohir", profession: "backend", type: "online" },
    //{id: 5259707725,name: "Abdulaziz Komiljonov",profession: "backend",type: "online"},
    //{id: 8270492933,name: "Yuldoshev Sirojiddin",profession: "backend",type: "online"},
    {id: 6461443178,name: "Davronbek Nazarov",profession: "backend",type: "offline"},
    {id: 1417999336,name: "Muslimbek Bostonov",profession: "frontend",type: "offline"},
    {id: 6134458285,name: "Davronbek Nabijonov",profession: "frontend",type: "offline"},
    {id: 8396840695, name: "Janob boshliq", profession: "fullstack", type: "offline" },
    {id: 1306147337,name: "Farrux To'g'onov",profession: "fullstack",type: "offline"},
    {id: 1771891844,name: "Oqilbek Erkinov",profession: "fullstack",type: "offline"},
    {id: 2035940312,name: "Fozilov Muzaffar",profession: "designer",type: "offline"}
];

// Admin tekshirish

function isAdmin(ctx) {
    return ctx.from.id === Number(process.env.ADMIN_ID);
}


// Bot ishga tushganda

bot.start((ctx) => {

    ctx.reply(
        "✅ Bot ishlamoqda"
    );

});



// Loyiha yuborish

async function sendProjects(ctx) {


    for (const user of users) {


        try {


            const list = projects[user.profession];


            if (!list) {

                console.log(
                    "Loyiha topilmadi:",
                    user.profession
                );

                continue;
            }



            const project =
                list[
                Math.floor(
                    Math.random() * list.length
                )
                ];



            const message =
                `
            👋 Assalomu alaykum ${user.name} va jamoamizning yangi ishtrokchisi! 🎉

            Sizni https://maps.google.com/maps?q=40.517045,71.910444&ll=40.517045,71.910444&z=16 manzilida joylashgan ofisimizga 13:00 da tashrif buyurishingizni so'raymiz. Siz bilan ofisimizda uchrashib, loyiha tafsilotlari, ish tartibi, vazifalar va foydalaniladigan platformalar haqida batafsil ma'lumot beriladi.
            Ish bo'yicha kelishuv hamda jamoa a'zolari bilan tanishish imkoniyati bo'ladi. Belgilangan muddatdan kechikmay yetib kelishingizni so'raymiz.
            `;

            
            //const message = user.type === 'offline' ? message1 : message2;

            await bot.telegram.sendMessage(
                user.id,
                message
            );



            console.log(
                "Yuborildi:",
                user.name
            );


        }

        catch (error) {

            console.log(
                "XATO:",
                user.id,
                error.message
            );

        }

    }


    ctx.reply(
        "✅ Loyihalar yuborildi"
    );

}



// Admin komandasi

bot.command(
    "send_projects",
    async (ctx) => {


        if (!isAdmin(ctx)) {

            return ctx.reply(
                "❌ Siz admin emassiz"
            );

        }


        await sendProjects(ctx);


    });




// Xatolar

bot.catch((err) => {

    console.log(
        "BOT XATO:",
        err
    );

});




// Ishga tushirish

bot.launch();


console.log(
    "🚀 Bot ishga tushdi"
);