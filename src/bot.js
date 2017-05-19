import TelegramBot from 'node-telegram-bot-api';

import config from "./config";

import {settingDir, settingPath} from './setting';
import {actionAsync} from './action';

const token = config.token;

const bot = new TelegramBot(token, {polling: true});
const defaultPath = config.defaultPath; //any your path

var currentlyPath;
var currentlyDir;

if (!currentlyPath)
  currentlyPath = defaultPath;

bot.on('message', (msg) => {
  if (!/cd/.test(`${msg.text}`)) {
    try {
      const id = msg.from.id;
      actionAsync(msg.text, currentlyPath, id, bot)
      bot.sendMessage(id, `${currentlyPath}`)
    } catch (e) {
      bot.sendMessage(id, `command not found`)
    }
  }
});

bot.onText(/cd (.+)/, (msg, match) => {
  try {
    const id = msg.from.id;

    currentlyPath = settingPath(match[1], currentlyPath, defaultPath);
    currentlyDir = settingDir(currentlyPath);
    if (!currentlyPath)
      currentlyPath = defaultPath;
    bot.sendMessage(id, `${currentlyPath}`)
  } catch (e) {

    bot.sendMessage(id, `command not found`)
  }
})
