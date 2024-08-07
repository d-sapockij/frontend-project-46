import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (diffObj, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diffObj);
    case 'plain':
      return plain(diffObj);
    case 'json':
      return json(diffObj);
    default:
      throw new Error(`Unknown format: '${format}'! Use stylish, plain, or json`);
  }
};

export default formatter;
