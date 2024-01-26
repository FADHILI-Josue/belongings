console.log(process.env["token"])

export const environment = {
    production: true,
    sanity: {
      SANITY_PROJECT_ID: process.env["SANITY_PROJECT_ID"],
      SANITY_DATASET: process.env["SANITY_DATASET"],
      SANITY_API_VERSION: process.env["SANITY_API_VERSION"],
      SANITY_PROJECT_TITLE: process.env["SANITY_PROJECT_TITLE"],
      token: process.env["token"]
    },
  };
    