module.exports = {
  template: "Photograph",
  file: {
    selector: "#file a",
    attribute: "href"
  },
  name: {
    selector: "#firstHeading",
  },
  fields: [
    {
      name: "polski",
      selector: ".commons-file-information-table .description.pl",
    },
    {
      name: "english",
      selector: ".commons-file-information-table .description.en",
    },
  ],
};
