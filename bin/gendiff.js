#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';

import parse from '../parser.js';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('0.8.0')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const data1 = readFileSync(path.resolve(__dirname, filepath1));
    const data2 = readFileSync(path.resolve(__dirname, filepath2));

    const obj1 = parse(data1);
    const obj2 = parse(data2);

    const diff = gendiff(obj1, obj2);
    console.log(diff);
  });

program.parse();
