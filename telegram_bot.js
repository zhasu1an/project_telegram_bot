const TelegpamApi = require('node-telegram-bot-api')
const {gameOpions , againOpions} = require('./options')
const token = '5101662248:AAGFS3QUS86PUchp8D44ZuABdqUDbNcSeYU' 

const bot = new TelegpamApi(token, {polling: true})

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `сейчас я загадаю цыфру от 0 до 9 ты должен угадать`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId,`огадай`, gameOpions)
}

const start = () => {

    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/developer', description: ' информацию о создателе'},
        {command: '/info', description:'получить информацию о пользователе'},
        {command: '/game', description:'игра'},
    ])

    bot.on('message', async msg=>{
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start'){
    await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
    return bot.sendMessage(chatId, `добро пожаловать в телеграм`)
    }
    if (text === '/developer'){
        return bot.sendMessage(chatId, `мой создатель @zhasulan_jjm `)
    }
    if (text === '/info'){
        return bot.sendMessage(chatId,`тебя зовут ${msg.from.first_name} `)
    }
    if(text === '/game'){
        return startGame(chatId);
    }
    return bot.sendMessage(chatId,'я тебя не понимаю, попробуй еще раз ;)')
})

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if(data === '/again'){
            return startGame(chatId)
        }
        if(data === chatId[chatId]){
            return bot.sendMessage(chatId, `Позддравляю ты отгадал цыфру ${chats[chatId]}`, againOpions)
        }else{
            return bot.sendMessage(chatId, `К сожелению ты  не угадал , я выбрал цыфру ${chats[chatId]}`, againOpions)
        }
    }) 
}
start()