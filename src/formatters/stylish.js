import { stringify } from '../utils/helpers.js';

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
    const lines = Object
      .values(currentValue)
      .flatMap((val) => {
        const currentIndent = replacer.repeat(indentSize);
        const currentIndentForSign = replacer.repeat(indentSize - signIndent);
        // const { name, value } = val;
        // Типа чтобы поменять все вот эти val.name, попробовать деструктуризировать

        // const sign = '';
        // Короче подумать как можно улучшить ситуацию с дублированием кода
        // ввести переменную sign или типа того

        if (val.state === 'added') {
          return `${currentIndentForSign}+ ${val.name}: ${stylishStringify(val.value, depth + 1)}`;
        }
        if (val.state === 'deleted') {
          return `${currentIndentForSign}- ${val.name}: ${stylishStringify(val.value, depth + 1)}`;
        }
        if (val.state === 'unchanged') {
          return `${currentIndentForSign}  ${val.name}: ${stylishStringify(val.value, depth + 1)}`;
        }
        if (val.state === 'changed') {
          return [
            `${currentIndentForSign}- ${val.name}: ${stylishStringify(val.value.beforeValue, depth + 1)}`,
            `${currentIndentForSign}+ ${val.name}: ${stylishStringify(val.value.afterValue, depth + 1)}`,
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
