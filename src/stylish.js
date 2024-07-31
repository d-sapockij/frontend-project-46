const stringify = (obj) => JSON.stringify(obj, null, ' ').replaceAll('"', '');

const stylish = (obj, replacer = ' ', spacesCount = 1) => {
    const iter = (currentValue, depth) => {
      if (Object.hasOwn(currentValue, 'state')) {
        if (currentValue.state === 'added') {
            return `+ ${currentValue.name}: ${stringify(currentValue.value)}`;
        }
        if (currentValue.state === 'deleted') {
            return `- ${currentValue.name}: ${stringify(currentValue.value)}`;
        }
        if (currentValue.state === 'changed') {
            return (
            `- ${currentValue.name}: ${stringify(currentValue.beforeValue)} 
             + ${currentValue.name}: ${stringify(currentValue.afterValue)}`
          );
        }
        if (currentValue.state === 'unchanged') {
            return `  ${currentValue.name}: ${stringify(currentValue.value)}`;
        }
    }
      if (typeof currentValue !== 'object' || currentValue === null) {
        return `${currentValue}`;
      }
  
      const indentSize = depth * spacesCount;
      const currentIndent = replacer.repeat(indentSize - 2);
      const bracketIndent = replacer.repeat(indentSize - spacesCount);

      const lines = Object
        .entries(currentValue)
        .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

      return [
        '{',
        ...lines,
        `${bracketIndent}}`,
      ].join('\n');

    // if (Object.hasOwn(currentValue, 'name') && Object.hasOwn(currentValue, 'state')) {
    //   return currentValue;
    // }

    // const indentSize = depth * spacesCount;
    // const currentIndent = replacer.repeat(indentSize);
    // const bracketIndent = replacer.repeat(indentSize - spacesCount);
    // const lines = Object
    //   .entries(currentValue)
    //   .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    // const keys = Object.keys(currentValue);
    // keys.forEach((key) => {
      // if (currentValue.state === 'added') {
      //   `+ ${currentValue.name}: ${stringify(currentValue.value)}`;
      // }
    // })

    };

  
    return iter(obj, 1);
  };

  export default stylish;
