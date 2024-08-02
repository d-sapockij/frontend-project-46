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
      const { value, state, children = null } = val;
      switch (state) {
        case 'added':
          return `Property '${newName}' was added with value: ${valueToString(value)}`;
        case 'deleted':
          return `Property '${newName}' was removed`;
        case 'changed':
          return `Property '${newName}' was updated. From ${valueToString(value.beforeValue)} to ${valueToString(value.afterValue)}`;
        case 'nested':
          return iter(children, newName);
        default:
          return '';
      };
    })
    .filter((line) => line !== '')
    .join('\n');

  return iter(obj, '');
};

export default plain;
