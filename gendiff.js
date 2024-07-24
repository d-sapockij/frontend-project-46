#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import parse from './parser.js';

const program = new Command();

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

// program
//   .name('gendiff')
//   .description('Compares two configuration files and shows a difference.')
//   .argument('<filepath1>')
//   .argument('<filepath2>')
//   .version('0.8.0')
//   .option('-f, --format [type]', 'output format')
//   .action((filepath1, filepath2) => {
//     const data1 = readFileSync(path.resolve(filepath1));
//     const data2 = readFileSync(path.resolve(filepath2));

//     const obj1 = parse(data1);
//     const obj2 = parse(data2);

//     const diff = gendiff(obj1, obj2);
//     console.log(diff);
//   });

// program.parse();

// export default gendiff;
