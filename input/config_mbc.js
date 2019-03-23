module.exports = {
  template: "Photograph",
  file: {
    selector: "#ContentTriggerWithImage",
    attribute: "href"
  },
  name: {
    selector: "[href*='submit2_1']"
  },
  fields: [
    {
      name: "photographer",
      selector: "[href*='submit3_1']"
    },
    {
      name: "medium",
      selector: "[href*='submit9_1']"
    },
    {
      name: "description",
      selector: "[href*='submit2_1']"
    },
    {
      name: "date",
      selector: "[href*='submit8_1']"
    },
    {
      name: "institution",
      selector: "[href*='submit30_1']"
    },
    {
      name: "accession number",
      selector: "[href*='aleph']"
    },
    {
      name: "oai",
      selector: "[href*='fbc.pionier']"
    },
    {
      name: "part_of",
      selector: "[href*='submit34_1']"
    },
    {
      name: "source",
      value: "@url"
    },
    {
      name: "notes",
      selector: "[href*='submit5_1']"
    },
    {
      name: "inscriptions"
    }
  ]
};
