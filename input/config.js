module.exports = [
  {
    name: 'title',
    selector: '#content .big_box:nth-child(3) .box_title:nth-child(3)',
    modifier: text => `{{pl|${text.substring(13)}}}`,
  },
  {
    name: 'place',
    selector: '#content .big_box:nth-child(3) .box_title:nth-child(5)',
    modifier: text => `{{pl|${text.substring(10)}}}`,
  },
];
