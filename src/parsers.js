import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';

import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonParse = (data) => JSON.parse(data);
const yamlParse = (data) => yaml.load(data);

const parse = (filepath) => {
  const extension = path.extname(filepath);
  const data = readFileSync(path.resolve(__dirname, '..', '__fixtures__', filepath));
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
