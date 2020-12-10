const { Client, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
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

//quiet clear
cardinal.on('message', (message) => {
  /* Проверяем что сообщение начинается с префикса */
  if (!message.content.startsWith(prefix)) return;
  /* Разделяем сообщение на массив из аргументов обрезая на длину префикса */
  let args = message.content.substring(prefix.length).split(' ');
  /* Получаем комманду, первый элемент массива */
  let command = args.shift();
  if (message.content === '/quiet clear') {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Для использования данной команды тебе необходимы права для удаления сообщения');
      /* Получаем кол-во сообщений к удалению, проверяем, что колд-во указанно корректно, если нет задаем кол-во равным 100 */
      let count = Number.parseInt(args[0]);
      if (!count || count > 100 || count <= 0) count = 100;
      message.channel
          .bulkDelete(count)
          .then(() => {
            
          })
          .catch((err) => {
              message.channel.send('PERMISSION ERROR');
          });
  }
});

//activity
cardinal.on('ready', () => {
  cardinal.user.setActivity('Cheack system. If you want call me - write /systemcall', { type: 'PLAYING' })
})

//cheackpingcardinal
cardinal.on('message', message => {
  if (message.content === '/chi') {
    message.channel.send('cha')
  }
});


//help
cardinal.on('message', message => {
  // If the message is "how to embed"
  if (message.content === '/help hight') {
const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#FF0000')
	.setTitle('AGREE PERMISSION')
	.setAuthor('Cardinal', 'https://i.imgur.com/pFgee3N.jpg', 'https://discord.js.org')
	.setDescription('Привет, я многофункциональная система Cardinal, если у вас есть роль высокого уровня доступа, то для выполнения функций пропишите /systemcall .')
  .setThumbnail('https://media.giphy.com/media/z96fCjqgTkGmaXAlNp/giphy.gif')
  .setURL('https://vk.com/group/eum')
	.addFields(
		{ name: 'COMMANDS', value: 'Commands for roles hight pass.' },
		{ name: '\u200B', value: '\u200B' },
		{ name: '/clear', value: 'Удаление сообщений. ( empty - full; 1-100 number message.', block : true },
		{ name: '/quiet clear', value: 'Тихое удаление сообщений. ( empty - full; 1-100 number message.', block : true },
	)
	.addField('This commands only for:', '"Founder / Developer / Server Manager"', true)
	.setImage('https://i.imgur.com/pFgee3N.jpg')
	.setTimestamp()
	.setFooter('Cardinal', 'https://i.imgur.com/pFgee3N.jpg');

  message.channel.send(exampleEmbed);
}
});


cardinal.login(token); // Авторизация бота
