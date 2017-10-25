const chalk = require('chalk');

const c = console;

class Logger {
  static info(text) { c.log(chalk.gray(text)); }
  static log(text) { c.log(chalk.white(text)); }
  static warn(text) { c.log(chalk.yellow(text)); }
  static err(text) { c.log(chalk.red(text)); }
}

module.exports = Logger;
