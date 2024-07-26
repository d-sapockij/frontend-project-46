#!/usr/bin/env node

import { Command } from 'commander';

import parse from '../src/parsers.js';
import compareObjects from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('0.8.0')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const obj1 = parse(filepath1);
    const obj2 = parse(filepath2);

    const diff = compareObjects(obj1, obj2);
    console.log(diff);
  });

program.parse();
