const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const cardinal = new Discord.Client(); // Объявляем, что cardinal - бот
const comms = require("./comms.js"); // main comms
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js  
let config = require('./config.json'); // Подключаем файл с параметрами и информацией
let token = config.token; // «Вытаскиваем» из него токен
let prefix = config.prefix; // «Вытаскиваем» из него префикс

//console
cardinal.on("ready", function() {
  console.log(cardinal.user.username + " запустился!");
});


cardinal.on('message', (msg) => { // Реагирование на сообщения
  if (msg.author.username != cardinal.user.username && msg.author.discriminator != cardinal.user.discriminator) {
    var comm = msg.content.trim() + " ";
    var comm_name = comm.slice(0, comm.indexOf(" "));
    var messArr = comm.split(" ");
    for (comm_count in comms.comms) {
      var comm2 = prefix + comms.comms[comm_count].name;
      if (comm2 == comm_name) {
        comms.comms[comm_count].out(cardinal, msg, messArr);
      }
    }
  }
});

//clear
cardinal.on('message', (message) => {
    /* Проверяем что сообщение начинается с префикса */
    if (!message.content.startsWith(prefix)) return;
    /* Разделяем сообщение на массив из аргументов обрезая на длину префикса */
    let args = message.content.substring(prefix.length).split(' ');
    /* Получаем комманду, первый элемент массива */
    let command = args.shift();
    if (command === 'clear') {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Для использования данной команды тебе необходимы права для удаления сообщения');
        /* Получаем кол-во сообщений к удалению, проверяем, что колд-во указанно корректно, если нет задаем кол-во равным 100 */
        let count = Number.parseInt(args[0]);
        if (!count || count > 100 || count <= 0) count = 100;
        message.channel
            .bulkDelete(count)
            .then(() => {
                message.channel.send(`Completed dell messages`);
            })
            .catch((err) => {
                message.channel.send('PERMISSION ERROR');
            });
    }
});

//activity
cardinal.on('ready', () => {
  cardinal.user.setActivity('Cheack system, is you want call me - say /systemcall', { type: 'PLAYING' })
})

//cheackpingcardinal
cardinal.on('message', message => {
  if (message.content === '/chi') {
    message.channel.send('cha');
  }
});

//help
cardinal.on('message', message => {
  if (message.content === '/help') {
    message.channel.send('Привет, я многофункциональная система Cardinal, если у вас есть роль высокого уровня доступа, то для выполнения функций у вас есть /systemcall .');
  }
});


//systemhelp
cardinal.on('message', message => {
  if (message.content === '/systemhelp') {
    message.channel.send('Очистка чата.');
    message.channel.send('Создание роли.');
    message.channel.send('Удаление роли.');
    message.channel.send('Добавление участников к роли.');
    message.channel.send('Удаление участников в роли.');
    message.channel.send('Блокировка участников.');
    message.channel.send('Мут участников.');
    message.channel.send('Кик участников.');
  }
});


cardinal.login(token); // Авторизация бота
