import { isObject, isArray } from '../utils/helpers.js';

const valueToString = (value) => {
  if (isObject(value) || isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (obj) => {
  const iter = (currentValue, name) => Object
    .values(currentValue)
    .map((val) => {
      const currentName = val.name;
      const newName = [name, currentName]
        .filter((line) => line !== '')
        .join('.');
      // let line = '';

      if (val.state === 'added') {
        return ` '${newName}' was added with value: ${valueToString(val.value)}`;
      }
      if (val.state === 'deleted') {
        return ` '${newName}' was removed`;
      }
      if (val.state === 'changed') {
        return ` '${newName}' was updated. From ${valueToString(val.value.beforeValue)} to ${valueToString(val.value.afterValue)}`;
      }
      if (val.state === 'nested') {
        return iter(val.children, newName);
      }
      return '';
    })
    .filter((line) => line !== '')
    .join('\n');

  return iter(obj, '');
};

export default plain;
