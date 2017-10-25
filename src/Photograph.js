const cheerio = require('cheerio');

class Photograph {

  constructor(data, fields) {
    this.$ = cheerio.load(data);

    fields.forEach(element => this.setValue(element));
    this.fields = fields;
  }

  setValue(element) {
    const text = this.$(element.selector).text().trim();
    Object.assign(element, {
      value: element.modifier
        ? element.modifier(text)
        : text,
    });
  }

  get wikicode() {
    let code = '{{Photograph\n';
    this.fields.forEach((element) => {
      code = code.concat(` | ${element.name} = ${element.value}\n`)
    });
    code = code.concat('}}');

    return code;
  }
}

module.exports = Photograph;
