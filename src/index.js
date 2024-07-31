import parse from '../src/parsers.js';
import stylish from '../src/stylish.js';

const getUnique = (arr) => arr
  .filter((el, index) => index === arr.indexOf(el))
  .sort();

const compareObjects = (filepath1, filepath2) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  const iter = (obj1, obj2) => {
    const diffObj = { };

    const keys = getUnique([...Object.keys(obj1), ...Object.keys(obj2)]);
    keys.forEach((key) => {
      if (!Object.hasOwn(obj1, key)) {
        // diffObj[`+ ${key}`] = obj2[key];
        diffObj[key] = {
          name: key,
          state:'added',
          value: obj2[key],
        };
      } else if (!Object.hasOwn(obj2, key)) {
        // diffObj[`- ${key}`] = obj1[key];
        diffObj[key] = {
          name: key,
          state:'deleted',
          value: obj1[key],
        };
      } else if (obj1[key] !== obj2[key]) {
        if (typeof obj1[key] !== 'object' || typeof obj2[key] !== 'object') {
          // diffObj[`- ${key}`] = obj1[key];
          // diffObj[`+ ${key}`] = obj2[key];
          diffObj[key] = {
            name: key,
            state:'changed',
            beforeValue: obj1[key],
            afterValue: obj2[key],
          };
        } else {
          diffObj[`  ${key}`] = iter(obj1[key], obj2[key]);
        }
      } else {
        // diffObj[`  ${key}`] = obj1[key];
        diffObj[key] = {
          name: key,
          state:'unchanged',
          value: obj1[key],
        };
      }
    });
  
    return diffObj;
  };

  const result = iter(obj1, obj2);
  return stylish(result, ' ', 4)
  // return JSON.stringify(result, null, '   ').replaceAll('"', '').replaceAll(',', '');
};

export default compareObjects;