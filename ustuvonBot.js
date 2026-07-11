require("dotenv").config();

const { Telegraf } = require("telegraf");
const projects = require("./projects");

const bot = new Telegraf(process.env.BOT_TOKEN);


// Nomzodlar

const users = [
    {
        id: 8396840695,
        name: "John Doe",
        profession: "frontend"
    },
    {
        id: 8099181223,
        name: "John Doe",
        profession: "backend"
    }
];


// Admin tekshirish

function isAdmin(ctx) {
    return ctx.from.id === Number(process.env.ADMIN_ID);
}


// Bot ishga tushganda

bot.start((ctx)=>{

    ctx.reply(
        "✅ Bot ishlamoqda"
    );

});



// Loyiha yuborish

async function sendProjects(ctx){


    for(const user of users){


        try{


            const list = projects[user.profession];


            if(!list){

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
👋 Assalomu alaykum ${user.name}

🎯 Siz keyingi bosqichga o'tdingiz.

🚀 Sizga berilgan loyiha:

📌 ${project.title}


${project.text}


⏰ Muddat:
48 soat


Tayyor bo'lgach GitHub link yuboring.

Omad! 🔥
`;



            await bot.telegram.sendMessage(
                user.id,
                message
            );



            console.log(
                "Yuborildi:",
                user.name
            );


        }

        catch(error){

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
async(ctx)=>{


    if(!isAdmin(ctx)){

        return ctx.reply(
            "❌ Siz admin emassiz"
        );

    }


    await sendProjects(ctx);


});




// Xatolar

bot.catch((err)=>{

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