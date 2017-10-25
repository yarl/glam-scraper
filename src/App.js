const axios = require('axios');

const Logger = require('./Logger');
const Photograph = require('./Photograph');

class App {

  constructor(pages, config) {
    Logger.info(`Loaded list of ${pages.length} pages\n`);

    this.index = 0;
    this.config = config;
    this.pages = pages;
    this.loadPage();
  }

  loadPage() {
    const page = this.pages[this.index];
    this.index += 1;
    if (!page) { return; }

    Logger.log(`Loading ${page}`);
    axios.get(page)
      .then((response) => {
        const photo = new Photograph(response.data, this.config);
        Logger.info(photo.wikicode);

        this.loadPage();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = App;
