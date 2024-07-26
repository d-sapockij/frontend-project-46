import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import parse from '../src/parsers.js';
import compareObjects from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const expected = `{
 - follow: false,
   host: hexlet.io,
 - proxy: 123.234.53.22,
 - timeout: 50,
 + timeout: 20,
 + verbose: true
}`;

test('2 json files comparison', () => {
  const filepath1 = path.resolve(__dirname, '..', '__fixtures__', 'file1.json');
  const filepath2 = path.resolve(__dirname, '..', '__fixtures__', 'file2.json');
  
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  expect(compareObjects(obj1, obj2)).toEqual(expected);
});

test('2 yml files comparison', () => {
    const filepath1 = path.resolve(__dirname, '..', '__fixtures__', 'file1.yml');
    const filepath2 = path.resolve(__dirname, '..', '__fixtures__', 'file2.yml');

    const obj1 = parse(filepath1);
    const obj2 = parse(filepath2);
  expect(compareObjects(obj1, obj2)).toEqual(expected);
});
