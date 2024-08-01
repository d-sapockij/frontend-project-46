import parse from './parsers.js';
import stylish from './stylish.js';
import { getUniqueItems, isObject } from './helpers.js';

const compareObjects = (filepath1, filepath2, { format } = { format: 'stylish' }) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const iter = (obj1, obj2) => {
    const diffObj = { };
    const keys = getUniqueItems([...Object.keys(obj1), ...Object.keys(obj2)]);

    keys.forEach((key) => {
      if (!Object.hasOwn(obj1, key)) {
        diffObj[key] = {
          name: key,
          state: 'added',
          value: obj2[key],
        };
      } else if (!Object.hasOwn(obj2, key)) {
        diffObj[key] = {
          name: key,
          state: 'deleted',
          value: obj1[key],
        };
      } else if (isObject(obj1[key]) && isObject(obj2[key])) {
        diffObj[key] = {
          name: key,
          state: 'nested',
          children: iter(obj1[key], obj2[key]),
        };
      } else if (obj1[key] !== obj2[key]) {
        diffObj[key] = {
          name: key,
          state: 'changed',
          value: {
            beforeValue: obj1[key],
            afterValue: obj2[key],
          },
        };
      } else {
        diffObj[key] = {
          name: key,
          state: 'unchanged',
          value: obj1[key],
        };
      }
    });
    return diffObj;
  };

  const result = iter(data1, data2);
  return format === 'stylish' ? stylish(result, ' ', 4) : JSON.stringify(result);
  // return stylish(result, ' ', 4);
};

export default compareObjects;
