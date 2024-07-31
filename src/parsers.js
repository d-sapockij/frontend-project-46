// import { readFileSync } from 'node:fs';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from 'node:path';

import yaml from 'js-yaml';
import { readFile, getExtension } from './utils.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const jsonParse = (data) => JSON.parse(data);
const yamlParse = (data) => yaml.load(data);

const parse = (filepath) => {
  const extension = getExtension(filepath);
  const data = readFile(filepath);

  let parsedData = { };

  if (extension === '.json') {
    parsedData = jsonParse(data);
  }
  if (extension === '.yaml' || extension === '.yml') {
    parsedData = yamlParse(data);
  }

  return parsedData;
};

export default parse;
