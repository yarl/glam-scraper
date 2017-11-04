const axios = require('axios');

const Excel = require('./Excel');
const Logger = require('./Logger');
const Image = require('./Image');

class App {

  constructor(pages, config, args) {
    Logger.info(`Loaded list of ${pages.length} pages\n`);

    this.args = args;
    this.index = 0;
    this.config = config;
    this.pages = pages;
    this.queue = [];

    if (this.args.download) {
      this.config.download = true;
    }

    this.loadPage();
  }

  save() {
    const excel = new Excel(this.queue);
    excel
      .save()
      .then((fileName) => {
        Logger.success(`\nFile saved as ${fileName}`);
        process.exit(0);
      })
      .catch(Logger.err);
  }

  loadPage() {
    const url = this.pages[this.index];
    this.index += 1;
    if (!url) {
      this.save();
      return;
    }

    Logger.log(`Loading ${this.index} of ${this.pages.length}: ${url}`);
    axios.get(url)
      .then((response) => {
        const image = new Image({
          url,
          html: response.data,
          config: this.config,
        });

        if (this.args.download) {
          Logger.log('Downloading image... ', true);
          image
            .downloadFile()
            .then(() => {
              Logger.success('OK');
              this.queue.push(image);
              this.loadPage();
            })
            .catch(() => {
              Logger.err('Error!');
            });
        } else {
          this.queue.push(image);
          this.loadPage();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = App;
