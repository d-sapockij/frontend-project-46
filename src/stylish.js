import { isObject, stringify } from './helpers.js';

const stylish = (obj, replacer = ' ', spacesCount = 1) => {
  const currentStringify = (value, currentDepth) => (
    stringify(value, currentDepth, replacer, spacesCount)
  );

  const iter = (currentValue, depth) => {
    const indentSize = depth * spacesCount;
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .values(currentValue)
      .flatMap((val) => {
        const currentIndent = replacer.repeat(indentSize);
        const currentIndentForSymbols = replacer.repeat(indentSize - 2);
        if (!isObject(val)) {
          return `${val.value}`;
        }

        if (val.state === 'added') {
          return `${currentIndentForSymbols}+ ${val.name}: ${currentStringify(val.value, depth + 1)}`;
        }
        if (val.state === 'deleted') {
          return `${currentIndentForSymbols}- ${val.name}: ${currentStringify(val.value, depth + 1)}`;
        }
        if (val.state === 'unchanged') {
          return `${currentIndentForSymbols}  ${val.name}: ${currentStringify(val.value, depth + 1)}`;
        }
        if (val.state === 'changed') {
          return [
            `${currentIndentForSymbols}- ${val.name}: ${currentStringify(val.value.beforeValue, depth + 1)}`,
            `${currentIndentForSymbols}+ ${val.name}: ${currentStringify(val.value.afterValue, depth + 1)}`,
          ];
        }

        return `${currentIndent}${val.name}: ${iter(val.children, depth + 1)}`;
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
