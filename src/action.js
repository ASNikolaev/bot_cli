import Promise from "bluebird"
import process from 'child_process';

const execAsync = Promise.promisify(process.exec);

const actionAsync = (text, path, id, bot) => {
  execAsync(text, {cwd: path}).then(res => {
    if (res === "")
      res = "empty"
    bot.sendMessage(id, `${res}`)
  }).catch(err => {
    bot.sendMessage(id, "command not found")
  });
};

export {actionAsync}
