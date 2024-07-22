#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('0.8.0')
  .option('-f, --format [type]', 'output format')
  .parse();

// program.parse();


// program
//   .option('--no-sauce', 'Remove sauce')
//   .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
//   .option('--no-cheese', 'plain with no cheese')
//   .parse();