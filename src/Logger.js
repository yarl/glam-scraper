const chalk = require('chalk');

class Logger {
  static info(text, inline) { this.write('gray', text, inline); }
  static log(text, inline) { this.write('white', text, inline); }
  static warn(text, inline) { this.write('yellow', text, inline); }
  static err(text, inline) { this.write('red', text, inline); }
  static success(text, inline) { this.write('green', text, inline); }

  static write(color, text = '', inline) {
    process.stdout.write(chalk[color](`${text}${inline ? '' : '\n'}`));
  }
}

module.exports = Logger;
