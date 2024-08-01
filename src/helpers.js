const getUniqueItems = (arr) => arr
  .filter((el, index) => index === arr.indexOf(el))
  .sort();

const isObject = (data) => typeof data === 'object' && data !== null;

const stringify = (value, depth = 1, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, currentDepth) => {
    if (!isObject(currentValue)) {
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

export { getUniqueItems, isObject, stringify };
