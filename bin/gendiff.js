#!/usr/bin/env node

import { Command } from 'commander';

import compareObjects from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('0.8.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = compareObjects(filepath1, filepath2);
    console.log(diff);
  });

program.parse();