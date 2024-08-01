import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (diffObj, format) => {
  if (format === 'stylish') {
    return stylish(diffObj);
  }
  if (format === 'plain') {
    return plain(diffObj);
  }
  const result = JSON.stringify(diffObj, null, ' ');
  return result;
};

export default formatter;
