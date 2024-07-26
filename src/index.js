const getUnique = (arr) => arr
  .filter((el, index) => index === arr.indexOf(el))
  .sort();

const gendiff = (obj1, obj2) => {
  const diffObj = { };
  const keys = getUnique([...Object.keys(obj1), ...Object.keys(obj2)]);

  keys.forEach((key) => {
    if (!Object.hasOwn(obj1, key)) {
      // added;
      diffObj[`+ ${key}`] = obj2[key];
    } else if (!Object.hasOwn(obj2, key)) {
      // deleted
      diffObj[`- ${key}`] = obj1[key];
    } else if (obj1[key] !== obj2[key]) {
      // changed
      diffObj[`- ${key}`] = obj1[key];
      diffObj[`+ ${key}`] = obj2[key];
    } else {
      // unchanged
      diffObj[`  ${key}`] = obj1[key];
    }
  });

  const result = JSON
    .stringify(diffObj, null, ' ')
    .replaceAll('"', '');

  return result;
};

export default gendiff;
