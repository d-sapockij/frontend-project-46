import _ from 'lodash';

const valueToString = (value) => {
  if (_.isObject(value) || Array.isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (obj) => {
  const iter = (currentValue, name) => currentValue
    .map((val) => {
      const {
        name: currentName,
        value,
        type,
        children = null,
      } = val;
      const newName = [name, currentName]
        .filter((line) => line !== '')
        .join('.');

      switch (type) {
        case 'added':
          return `Property '${newName}' was added with value: ${valueToString(value)}`;
        case 'deleted':
          return `Property '${newName}' was removed`;
        case 'changed':
          return `Property '${newName}' was updated. From ${valueToString(value.beforeValue)} to ${valueToString(value.afterValue)}`;
        case 'nested':
          return iter(children, newName);
        default:
          return null;
      }
    })
    .filter((line) => line !== null)
    .join('\n');

  return iter(obj, '');
};

export default plain;
