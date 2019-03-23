module.exports = {
  template: "Photograph",
  file: {
    selector: "a",
    attribute: "href",
  },
  name: {
    selector: "title",
  },
  fields: [
    {
      name: "redir",
      selector: "#EditionsList",
      modifier: text => text.substring(117),
    },
  ],
};
