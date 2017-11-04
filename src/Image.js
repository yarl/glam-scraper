const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const request = require('request');

class Image {

  constructor(data) {
    this.$ = cheerio.load(data.html);

    this.isDownload = data.config.download;
    this.fields = [];
    this.templateName = data.config.template;
    this.url = data.url;

    this.loadFile(data.config.file);
    this.loadName(data.config.name);
    this.loadFields(data.config.fields);
  }

  downloadFile() {
    const uri = this.file;
    const filename = this.file.split('/').pop();
    const filepath = path.join(__dirname, '..', 'output', filename);

    return new Promise((resolve, reject) => {
      request.head(uri, (err) => {
        if (err) { reject(err); }
        request(uri)
          .pipe(fs.createWriteStream(filepath))
          .on('close', () => {
            this.localFile = filepath;
            resolve();
          });
      });
    });
  }

  loadFile(element) {
    const text = this
      .$(element.selector)
      .attr(element.attribute)
      .trim();

    this.file = element.modifier
      ? element.modifier(text)
      : text;
  }

  loadFields(fields) {
    fields.forEach(element => this.setField(element));
  }

  loadName(element) {
    const text = element.selector
      ? this.$(element.selector).text().trim()
      : element.value || '';

    this.name = element.modifier
      ? element.modifier(text)
      : text;
  }

  setField(element) {
    let text = element.selector
      ? this.$(element.selector).text().trim()
      : element.value || '';

    if (text === '@url') {
      text = this.url;
    }

    this.fields.push({
      name: element.name,
      value: element.modifier
        ? element.modifier(text)
        : text,
    });
  }

  get wikicode() {
    let code = `{{${this.templateName}\n`;
    this.fields.forEach((element) => {
      code = code.concat(` | ${element.name} = ${element.value}\n`);
    });
    code = code.concat('}}');

    return code;
  }

  get wikicodePattypan() {
    let code = `{{${this.templateName}\n`;
    this.fields.forEach((element) => {
      code = code.concat(` | ${element.name} = \${${element.name.replace(/ +/g, '_')}}\n`);
    });
    code = code.concat('}}');

    return code;
  }
}

module.exports = Image;
