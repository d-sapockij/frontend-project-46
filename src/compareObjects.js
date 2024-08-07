import _ from 'lodash';

const getSortedUniqueItems = (arr) => _.sortBy(_.uniq(arr));

const compareObjects = (obj1, obj2) => {
  const keys = getSortedUniqueItems([...Object.keys(obj1), ...Object.keys(obj2)]);

  const diffObj = keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return {
        name: key,
        type: 'added',
        value: obj2[key],
      };
    }
    if (!Object.hasOwn(obj2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: obj1[key],
      };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        name: key,
        type: 'nested',
        children: compareObjects(obj1[key], obj2[key]),
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        name: key,
        type: 'changed',
        value: {
          beforeValue: obj1[key],
          afterValue: obj2[key],
        },
      };
    }
    return {
      name: key,
      type: 'unchanged',
      value: obj1[key],
    };
  });
  return diffObj;
};

export default compareObjects;
