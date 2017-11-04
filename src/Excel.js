const path = require('path');
const xl = require('excel4node');

class Excel {

  constructor(queue) {
    this.queue = queue;

    this.wb = new xl.Workbook();
    this.dataSheet = this.wb.addWorksheet('Data');
    this.templateSheet = this.wb.addWorksheet('Template');

    this.addData();
    this.addTemplate();
  }

  addData() {
    this.addDataHeader();
    this.queue
      .forEach((element, index) => {
        this.addDataRow(element, index);
      });
  }

  addDataRow(element, rowIndex) {
    this.dataSheet
      .cell(rowIndex + 2, 1)
      .string(element.localFile || element.file);

    this.dataSheet
      .cell(rowIndex + 2, 2)
      .string(element.name);

    element.fields
      .forEach((field, colIndex) => {
        this.dataSheet
          .cell(rowIndex + 2, colIndex + 3)
          .string(field.value);
      });
  }

  addDataHeader() {
    [
      { name: 'path' },
      { name: 'name' },
      ...this.queue[0].fields,
    ].forEach((element, index) => {
      this.dataSheet
        .cell(1, index + 1)
        .string(element.name.replace(/ +/g, '_'));
    });
  }

  addTemplate() {
    this.templateSheet
      .cell(1, 1)
      .string(this.queue[0].wikicodePattypan);
  }

  save() {
    const filename = `glam-scraper ${new Date().toISOString()}.xls`;
    const filepath = path.join(__dirname, '..', 'output', filename);

    return new Promise((resolve, reject) => {
      this.wb.write(
        filepath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(filename);
          }
        });
    });
  }

}

module.exports = Excel;
