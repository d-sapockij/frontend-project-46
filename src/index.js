import parse from './parsers.js';
import compareObjects from './compareObjects.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const result = compareObjects(data1, data2);
  // console.log(result)
  return formatter(result, format);
};

export default genDiff;
