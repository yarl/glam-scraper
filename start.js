const chalk = require('chalk');
const fs = require('fs');
const minimist = require('minimist');
const path = require('path');
const readline = require('readline');

const App = require('./src/App');
const Logger = require('./src/Logger');

const config = require('./input/config');

const args = minimist(process.argv.slice(2));
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readList(fileName) {
  return new Promise((resolve, reject) => {
    try {
      const data = fs.readFileSync(
        path.join(__dirname, fileName),
        'utf8',
      );
      const output = data
        .toString()
        .split('\n')
        .map(element => element.trim())
        .filter(element => element);
      resolve(output);
    } catch (err) {
      reject(err);
    }
  });
}

function getList() {
  return new Promise((resolve, reject) => {
    try {
      if (args.pages) {
        resolve(readList(args.pages));
      }
      rl.question(
        chalk.cyan('What is the name of list file?\n> '),
        (input) => {
          rl.close();
          if (!input) { process.exit(0); }
          resolve(readList(input));
        });
    } catch (err) {
      reject(err);
    }
  });
}

function start() {
  getList()
    .then(list => new App(list, config))
    .catch(Logger.err);
}

start();
