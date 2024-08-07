import path from 'node:path';
import { readFileSync } from 'node:fs';

import parse from './parsers.js';
import compareObjects from './compareObjects.js';
import formatter from './formatters/index.js';

const getExtension = (filepath) => path.extname(filepath).replace('.', '');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = readFileSync(filepath1);
  const extension1 = getExtension(filepath1);

  const data2 = readFileSync(filepath2);
  const extension2 = getExtension(filepath2);

  const parsedData1 = parse(data1, extension1);
  const parsedData2 = parse(data2, extension2);

  const result = compareObjects(parsedData1, parsedData2);
  return formatter(result, format);
};

export default genDiff;
