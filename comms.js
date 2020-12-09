const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const prefix = config.prefix; // «Вытаскиваем» префикс
const ms = require('ms')

// command func //


function truegor(cardinal, mess, args) {
  mess.channel.send('Реально')
}

function systemcall(cardinal, mess, args) {
  mess.channel.send('Слушаю.')
}



//commands var //

var comms_list = [{
  name: "egorpidor",
  out: truegor,
  about: "Тестовая команда"
},

{
  name: "systemcall",
  out: systemcall,
  about: "Команда для приветствия!"
}
]



module.exports.comms = comms_list;