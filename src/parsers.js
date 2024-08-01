import yaml from 'js-yaml';
import { readFile, getExtension } from './readFileUtils.js';

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
