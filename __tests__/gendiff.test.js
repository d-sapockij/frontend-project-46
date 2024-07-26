import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import parse from '../parser.js';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath1 = path.resolve(__dirname, '../file1.json');
const filepath2 = path.resolve(__dirname, '../file2.json');

const data1 = readFileSync(filepath1);
const data2 = readFileSync(filepath2);

const obj1 = parse(data1);
const obj2 = parse(data2);

const expected = `{
 - follow: false,
   host: hexlet.io,
 - proxy: 123.234.53.22,
 - timeout: 50,
 + timeout: 20,
 + verbose: true
}`;

test('gendiff', () => {
  expect(gendiff(obj1, obj2)).toEqual(expected);
});
