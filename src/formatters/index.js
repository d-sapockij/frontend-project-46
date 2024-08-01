import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (diffObj, format) => {
  if (format === 'stylish') {
    return stylish(diffObj);
  }
  if (format === 'plain') {
    return plain(diffObj);
  }
  if (format === 'json') {
    return json(diffObj);
  }
  return 'Unexpected format';
};

export default formatter;
