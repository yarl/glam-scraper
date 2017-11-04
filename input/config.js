module.exports = {
  template: 'Photograph',
  file: {
    selector: '#content > div:nth-child(3) > div.big_box_content > div.photo > a > img',
    attribute: 'src',
    modifier: text => text.replace('SM0/SM0_', 'PIC/PIC_'),
  },
  name: {
    selector: '#content > div:nth-child(3) > div.big_box_content > div:nth-child(1)',
    modifier: text => `${text.substring(14)}`,
  },
  fields: [
    {
      name: 'photographer',
      selector: '#content > div:nth-child(3) > div.big_box_content > div:nth-child(11)',
      modifier: text => `{{Creator:${text.substring(7)}}}`,
    },
    {
      name: 'medium',
      value: '{{technique|photo}}',
    },
    {
      name: 'description',
      selector: '#content > div:nth-child(3) > div.big_box_content > div:nth-child(3)',
      modifier: text => `{{pl|${text.substring(13)}}}`,
    },
    {
      name: 'depicted people',
      selector: '#content > div:nth-child(3) > div.big_box_content > div:nth-child(6)',
      modifier: text => `${text.substring(16)}`,
    },
    {
      name: 'depicted place',
      selector: '#content > div:nth-child(3) > div.big_box_content > div:nth-child(5)',
      modifier: text => `{{city|${text.substring(10)}}}`,
    },
    {
      name: 'date',
      selector: '#content > div:nth-child(3) > div.big_box_content > div:nth-child(4)',
      modifier: text => `${text.substring(17)}`,
    },
    {
      name: 'institution',
      value: '{{Institution:Narodowe Archiwum Cyfrowe}}',
    },
    {
      name: 'accession number',
      selector: '#content > div:nth-child(3) > div.big_box_content > div:nth-child(13)',
      modifier: text => `${text.substring(11)}`,
    },
    {
      name: 'source',
      value: '@url',
    },
    {
      name: 'notes',
    },
    {
      name: 'inscriptions',
    },
  ],
};
