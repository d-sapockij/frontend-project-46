import yaml from 'js-yaml';

const jsonParse = (data) => JSON.parse(data);
const yamlParse = (data) => yaml.load(data);

const parse = (data, extension) => {
  switch (extension) {
    case 'json':
      return jsonParse(data);
    case 'yaml':
    case 'yml':
      return yamlParse(data);
    default:
      throw new Error(`Unknown file extension: '${extension}'! Only .json, .yml or .yaml are supported.`);
  }
};

export default parse;
