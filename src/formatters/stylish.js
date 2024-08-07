import _ from 'lodash';

const stringify = (value, depth = 1, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = currentDepth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, currentDepth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, depth);
};

const stylish = (obj) => {
  const replacer = ' ';
  const spacesCount = 4;

  const stylishStringify = (value, currentDepth) => (
    stringify(value, currentDepth, replacer, spacesCount)
  );

  const iter = (currentValue, depth) => {
    const indentSize = depth * spacesCount;
    const bracketIndent = ' '.repeat(indentSize - spacesCount);
    const signIndent = 2;
    const lines = currentValue
      .flatMap((val) => {
        const currentIndent = replacer.repeat(indentSize);
        const currentIndentForSign = replacer.repeat(indentSize - signIndent);
        const {
          name,
          value,
          type,
          children = null,
        } = val;

        switch (type) {
          case 'added':
            return `${currentIndentForSign}+ ${name}: ${stylishStringify(value, depth + 1)}`;
          case 'deleted':
            return `${currentIndentForSign}- ${name}: ${stylishStringify(value, depth + 1)}`;
          case 'unchanged':
            return `${currentIndentForSign}  ${name}: ${stylishStringify(value, depth + 1)}`;
          case 'changed':
            return [
              `${currentIndentForSign}- ${name}: ${stylishStringify(value.beforeValue, depth + 1)}`,
              `${currentIndentForSign}+ ${name}: ${stylishStringify(value.afterValue, depth + 1)}`,
            ];
          case 'nested':
            return `${currentIndent}${name}: ${iter(children, depth + 1)}`;
          default:
            return null;
        }
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(obj, 1);
};

export default stylish;
