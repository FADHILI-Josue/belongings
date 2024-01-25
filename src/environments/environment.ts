// import dotenv from 'dotenv'

// dotenv.config()

// const { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID, SANITY_PROJECT_TITLE, token } = process.env;

export const environment = {
    production: true,
    sanity: {
      SANITY_PROJECT_ID: "${SANITY_PROJECT_ID}",
      SANITY_DATASET: "${SANITY_DATASET}",
      SANITY_API_VERSION: "${SANITY_API_VERSION}",
      SANITY_PROJECT_TITLE: "${SANITY_PROJECT_TITLE}",
      token: "${token}"
    },
  };
    