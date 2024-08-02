import { getUniqueItems, isObject } from './utils/helpers.js';

const compareObjects = (obj1, obj2) => {
  // const diffObj = { };
  // Тут наделал туфты, нужно думать как тут будет формироваться diffObj
  // А то линтер ругался
  const keys = getUniqueItems([...Object.keys(obj1), ...Object.keys(obj2)]);

  const diffObj = keys.flatMap((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return {
        name: key,
        state: 'added',
        value: obj2[key],
      };
    } else if (!Object.hasOwn(obj2, key)) {
      return {
        name: key,
        state: 'deleted',
        value: obj1[key],
      };
    } else if (isObject(obj1[key]) && isObject(obj2[key])) {
      return {
        name: key,
        state: 'nested',
        children: compareObjects(obj1[key], obj2[key]),
      };
    } else if (obj1[key] !== obj2[key]) {
      return {
        name: key,
        state: 'changed',
        value: {
          beforeValue: obj1[key],
          afterValue: obj2[key],
        },
      };
    } 
    return {
      name: key,
      state: 'unchanged',
      value: obj1[key],
    };
  });
  console.log(...diffObj)
  return { ...diffObj };
};

export default compareObjects;
