const setEnv = () => {
    const fs = require('fs');
    const writeFile = fs.writeFile;
    const targetPath = './src/environments/environment.ts';
    require('dotenv').config()
    const {SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID, SANITY_PROJECT_TITLE,token } = process.env
    const envConfigFile = `export const environment = {
        production: false,
        sanity : {
            SANITY_PROJECT_ID:"${SANITY_PROJECT_ID}",
            SANITY_DATASET:"${SANITY_DATASET}",
            SANITY_API_VERSION:"${SANITY_API_VERSION}",
            SANITY_PROJECT_TITLE:"${SANITY_PROJECT_TITLE}",
            token: "${token}"
        },
    
    };
  `;
    console.log('The file `environment.ts` will be written with the following content: \n');
    writeFile(targetPath, envConfigFile, (err) => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
      }
    });
  }; 
  setEnv();
  